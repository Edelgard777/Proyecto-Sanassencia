import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import useColeccion from "../hooks/useColeccion";
import useAuth from "../hooks/useAuth.js";
import { claveCitaPendiente } from "../data/constantes";
import { validarCita } from "../utils/validaciones";

const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  especialidad: "",
  fecha: "",
  modalidad: "Presencial",
  mensaje: "",
};

function fechaLocalISO() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

function Agenda() {
  const navigate = useNavigate();
  const location = useLocation();
  const { crear: crearCita, actualizar: actualizarCita, error: errorColeccion } = useColeccion("citas");
  const { registros: especialidades } = useColeccion("especialidades");
  const { user } = useAuth();
  const [formulario, setFormulario] = useState(() => ({
    ...formularioInicial,
    ...location.state?.valores,
    nombre: location.state?.valores?.nombre ?? user?.nombre ?? "",
    correo: location.state?.valores?.correo ?? user?.correo ?? "",
  }));
  const [errores, setErrores] = useState({});

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: "" }));
  };

  const enviar = (event) => {
    event.preventDefault();
    const erroresValidacion = validarCita(formulario);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length) return;

    const { id, ...datosFormulario } = formulario;
    const datosCita = {
      ...datosFormulario,
      nombre: formulario.nombre.trim(),
      correo: formulario.correo.trim(),
      estado: "pendiente",
      creadaEn: new Date().toISOString(),
    };

    try {
      const guardada = id ? actualizarCita(id, datosCita) : crearCita(datosCita);
      window.sessionStorage.setItem(claveCitaPendiente, JSON.stringify(guardada));
      navigate("/agenda/confirmacion", { state: { cita: guardada } });
    } catch (error) {
      navigate("/agenda/error", {
        state: {
          resumen: datosCita,
          mensaje: error instanceof Error ? error.message : "No se pudo guardar la cita.",
        },
      });
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">AGENDA TU ATENCIÓN</span>
          <h1>Reserva un espacio para ti</h1>
          <p>Completa tus datos y podremos revisar tu solicitud de atención.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <form className="form-card col-12 col-lg-8" noValidate onSubmit={enviar}>
              <h2>Solicitud de hora</h2>
              <p className="form-intro">Ingresa tus datos y selecciona tus preferencias.</p>
              <div className="row g-3">
                <FormField
                  className="col-12 col-md-6"
                  label="Nombre completo"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  placeholder="Tu nombre"
                  error={errores.nombre}
                />
                <FormField
                  className="col-12 col-md-6"
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  value={formulario.correo}
                  onChange={actualizarCampo}
                  placeholder="tu@correo.com"
                  error={errores.correo}
                />
                <FormField
                  className="col-12 col-md-6"
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={formulario.telefono}
                  onChange={actualizarCampo}
                  placeholder="+56 9 ..."
                  error={errores.telefono}
                />
                <FormField
                  className="col-12 col-md-6"
                  label="Especialidad"
                  name="especialidad"
                  as="select"
                  value={formulario.especialidad}
                  onChange={actualizarCampo}
                  options={[
                    { value: "", label: "Selecciona una opción", disabled: true },
                    ...especialidades.map((especialidad) => ({
                      value: especialidad.nombre,
                      label: especialidad.nombre,
                    })),
                  ]}
                  error={errores.especialidad}
                />
                <FormField
                  className="col-12 col-md-6"
                  label="Fecha preferida"
                  name="fecha"
                  type="date"
                  value={formulario.fecha}
                  onChange={actualizarCampo}
                  min={fechaLocalISO()}
                  error={errores.fecha}
                />
                <FormField
                  className="col-12 col-md-6"
                  label="Modalidad"
                  name="modalidad"
                  as="select"
                  value={formulario.modalidad}
                  onChange={actualizarCampo}
                  options={[
                    { value: "Presencial", label: "Presencial" },
                    { value: "Online", label: "Online" },
                  ]}
                />
                <FormField
                  className="col-12"
                  label="Cuéntanos brevemente"
                  name="mensaje"
                  as="textarea"
                  rows={4}
                  value={formulario.mensaje}
                  onChange={actualizarCampo}
                  placeholder="¿Cómo podemos ayudarte?"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                <Icon name="calendar" size={19} /> Solicitar hora
              </button>
              <small className="privacy">
                <Icon name="check" size={15} /> Tu información será tratada de forma confidencial.
              </small>
              {errorColeccion && <p className="text-danger mt-3" role="alert">{errorColeccion}</p>}
            </form>
            <aside className="agenda-info col-12 col-lg-4">
              <span className="icon-chip large"><Icon name="heart" size={28} /></span>
              <h2>Estamos para orientarte</h2>
              <p>Si no sabes qué especialidad elegir, cuéntanos qué necesitas y podremos orientarte.</p>
              <div className="info-line">
                <Icon name="clock" />
                <div><strong>Horario referencial</strong><span>Lunes a viernes · 09:00 a 19:00</span></div>
              </div>
              <div className="info-line">
                <Icon name="map" />
                <div><strong>Atención</strong><span>Modalidad presencial y online según profesional</span></div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Agenda;

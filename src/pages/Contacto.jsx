import { useState } from "react";
import Icon from "../components/Icon";
import FormField from "../components/FormField";
import FormSuccess from "../components/FormSuccess";
import useColeccion from "../hooks/useColeccion";
import { validarMensaje } from "../utils/validaciones";

const valoresIniciales = {
  nombre: "",
  correo: "",
  asunto: "Consulta general",
  mensaje: "",
};

function Contacto() {
  const { crear: crearMensaje, error: errorColeccion } = useColeccion("mensajes");
  const [formulario, setFormulario] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: "" }));
    setEnviado(false);
    setErrorEnvio("");
  };

  const enviar = (event) => {
    event.preventDefault();
    const erroresValidacion = validarMensaje(formulario);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length) return;

    try {
      crearMensaje({
        ...formulario,
        nombre: formulario.nombre.trim(),
        correo: formulario.correo.trim(),
        estado: "nuevo",
        creadoEn: new Date().toISOString(),
      });
      setFormulario(valoresIniciales);
      setEnviado(true);
    } catch (error) {
      setEnviado(false);
      setErrorEnvio(error instanceof Error ? error.message : "No se pudo guardar el mensaje.");
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">HABLEMOS</span>
          <h1>Estamos cerca de ti</h1>
          <p>Escríbenos si tienes dudas sobre nuestras atenciones, profesionales o proceso de agendamiento.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-5">
              <div className="row g-3 contact-cards">
                <article className="col-12 col-sm-6">
                  <div className="card h-100"><div className="card-body">
                    <span className="icon-chip"><Icon name="map" /></span>
                    <h3>Visítanos</h3><p>Consulta la ubicación del centro antes de tu atención.</p>
                  </div></div>
                </article>
                <article className="col-12 col-sm-6">
                  <div className="card h-100"><div className="card-body">
                    <span className="icon-chip"><Icon name="phone" /></span>
                    <h3>Contáctanos</h3><p>Podrás incorporar aquí el teléfono oficial del centro.</p>
                  </div></div>
                </article>
                <article className="col-12 col-sm-6">
                  <div className="card h-100"><div className="card-body">
                    <span className="icon-chip"><Icon name="mail" /></span>
                    <h3>Correo</h3><p>Podrás incorporar aquí el correo oficial.</p>
                  </div></div>
                </article>
                <article className="col-12 col-sm-6">
                  <div className="card h-100"><div className="card-body">
                    <span className="icon-chip"><Icon name="instagram" /></span>
                    <h3>Redes sociales</h3><p>Agrega el perfil oficial para mantener informados a tus pacientes.</p>
                  </div></div>
                </article>
              </div>
            </div>
            <form className="form-card col-12 col-lg-7" noValidate onSubmit={enviar}>
              <h2>Envíanos un mensaje</h2>
              <p className="form-intro">Déjanos tu consulta y tus datos de contacto.</p>
              <FormField
                label="Nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={actualizarCampo}
                placeholder="Tu nombre"
                error={errores.nombre}
              />
              <FormField
                label="Correo"
                name="correo"
                type="email"
                value={formulario.correo}
                onChange={actualizarCampo}
                placeholder="tu@correo.com"
                error={errores.correo}
              />
              <FormField
                label="Asunto"
                name="asunto"
                as="select"
                value={formulario.asunto}
                onChange={actualizarCampo}
                options={[
                  "Consulta general",
                  "Especialidades",
                  "Profesionales",
                  "Agendamiento",
                ].map((asunto) => ({ value: asunto, label: asunto }))}
              />
              <FormField
                label="Mensaje"
                name="mensaje"
                as="textarea"
                rows={5}
                value={formulario.mensaje}
                onChange={actualizarCampo}
                placeholder="Escribe tu consulta"
                error={errores.mensaje}
              />
              <button className="btn btn-primary" type="submit">
                Enviar mensaje <Icon name="arrow" size={18} />
              </button>
              {enviado && (
                <FormSuccess
                  title="Mensaje guardado correctamente."
                  message="El equipo podrá revisarlo desde el panel de administración."
                />
              )}
              {(errorEnvio || errorColeccion) && (
                <p className="text-danger mt-3" role="alert">{errorEnvio || errorColeccion}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacto;

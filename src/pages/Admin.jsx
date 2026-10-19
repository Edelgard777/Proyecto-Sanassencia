import { useState } from "react";
import FormField from "../components/FormField";
import useColeccion from "../hooks/useColeccion";
import useAuth from "../hooks/useAuth.js";

const profesionalVacio = {
  iniciales: "",
  nombre: "",
  area: "",
  categoria: "",
  modalidad: "Presencial",
  detalle: "",
};

const estadosCita = ["pendiente", "confirmada", "cancelada"];

function Admin() {
  const citas = useColeccion("citas");
  const mensajes = useColeccion("mensajes");
  const profesionales = useColeccion("profesionales");
  const { user, logout } = useAuth();
  const [profesionalForm, setProfesionalForm] = useState(profesionalVacio);
  const [profesionalEditando, setProfesionalEditando] = useState("");
  const [errorFormulario, setErrorFormulario] = useState("");

  const editarProfesional = (profesional) => {
    setProfesionalEditando(profesional.id);
    setProfesionalForm({
      ...profesionalVacio,
      ...profesional,
    });
    setErrorFormulario("");
  };

  const guardarProfesional = (event) => {
    event.preventDefault();
    if (!profesionalForm.nombre.trim() || !profesionalForm.area.trim()) {
      setErrorFormulario("El nombre y el área son obligatorios.");
      return;
    }

    try {
      if (profesionalEditando) {
        profesionales.actualizar(profesionalEditando, profesionalForm);
      } else {
        profesionales.crear(profesionalForm);
      }
      setProfesionalForm(profesionalVacio);
      setProfesionalEditando("");
      setErrorFormulario("");
    } catch (error) {
      setErrorFormulario(error instanceof Error ? error.message : "No se pudo guardar el profesional.");
    }
  };

  const eliminarProfesional = (id) => {
    if (profesionalEditando === id) {
      setProfesionalEditando("");
      setProfesionalForm(profesionalVacio);
    }
    profesionales.eliminar(id);
  };

  const actualizarCita = (id, estado) => {
    citas.actualizar(id, { estado });
  };

  return (
    <main className="section admin-page">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
          <div>
            <span className="eyebrow">PANEL ADMINISTRADOR</span>
            <h1>Gestión del centro</h1>
            <p>Sesión: {user?.nombre}</p>
          </div>
          <button className="btn btn-secundario" type="button" onClick={logout}>Cerrar sesión</button>
        </div>

        <section className="admin-section mb-5">
          <h2>Citas</h2>
          {citas.error && <p className="text-danger" role="alert">{citas.error}</p>}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Paciente</th><th>Correo</th><th>Fecha</th><th>Especialidad</th><th>Estado</th><th>Acción</th></tr></thead>
              <tbody>
                {citas.registros.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.nombre}</td><td>{cita.correo}</td><td>{cita.fecha}</td><td>{cita.especialidad}</td>
                    <td>
                      <select
                        className="form-select"
                        aria-label={`Estado de cita de ${cita.nombre}`}
                        value={cita.estado}
                        onChange={(event) => actualizarCita(cita.id, event.target.value)}
                      >
                        {estadosCita.map((estado) => <option key={estado}>{estado}</option>)}
                      </select>
                    </td>
                    <td><button className="btn btn-outline-danger btn-sm" type="button" onClick={() => citas.eliminar(cita.id)}>Eliminar</button></td>
                  </tr>
                ))}
                {!citas.loading && citas.registros.length === 0 && <tr><td colSpan="6">Aún no hay citas.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section mb-5">
          <h2>Mensajes</h2>
          {mensajes.error && <p className="text-danger" role="alert">{mensajes.error}</p>}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Nombre</th><th>Correo</th><th>Asunto</th><th>Mensaje</th><th>Acción</th></tr></thead>
              <tbody>
                {mensajes.registros.map((mensaje) => (
                  <tr key={mensaje.id}>
                    <td>{mensaje.nombre}</td><td>{mensaje.correo}</td><td>{mensaje.asunto}</td><td>{mensaje.mensaje}</td>
                    <td><button className="btn btn-outline-danger btn-sm" type="button" onClick={() => mensajes.eliminar(mensaje.id)}>Eliminar</button></td>
                  </tr>
                ))}
                {!mensajes.loading && mensajes.registros.length === 0 && <tr><td colSpan="5">Aún no hay mensajes.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Profesionales</h2>
          {profesionales.error && <p className="text-danger" role="alert">{profesionales.error}</p>}
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <thead><tr><th>Nombre</th><th>Área</th><th>Modalidad</th><th>Acciones</th></tr></thead>
              <tbody>
                {profesionales.registros.map((profesional) => (
                  <tr key={profesional.id}>
                    <td>{profesional.nombre}</td><td>{profesional.area}</td><td>{profesional.modalidad}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => editarProfesional(profesional)}>Editar</button>
                      <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => eliminarProfesional(profesional.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form className="form-card" onSubmit={guardarProfesional}>
            <h3>{profesionalEditando ? "Editar profesional" : "Agregar profesional"}</h3>
            <div className="row g-3">
              <FormField className="col-12 col-md-6" label="Nombre" name="nombre" value={profesionalForm.nombre} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, nombre: event.target.value }))} />
              <FormField className="col-12 col-md-6" label="Iniciales" name="iniciales" value={profesionalForm.iniciales} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, iniciales: event.target.value }))} />
              <FormField className="col-12 col-md-4" label="Área" name="area" value={profesionalForm.area} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, area: event.target.value }))} />
              <FormField className="col-12 col-md-4" label="Categoría" name="categoria" value={profesionalForm.categoria} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, categoria: event.target.value }))} />
              <FormField className="col-12 col-md-4" label="Modalidad" name="modalidad" as="select" value={profesionalForm.modalidad} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, modalidad: event.target.value }))} options={["Presencial", "Online", "Presencial y online"].map((value) => ({ value, label: value }))} />
              <FormField className="col-12" label="Detalle" name="detalle" value={profesionalForm.detalle} onChange={(event) => setProfesionalForm((actual) => ({ ...actual, detalle: event.target.value }))} />
            </div>
            {errorFormulario && <p className="text-danger" role="alert">{errorFormulario}</p>}
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">{profesionalEditando ? "Guardar cambios" : "Crear profesional"}</button>
              {profesionalEditando && <button className="btn btn-secundario" type="button" onClick={() => { setProfesionalEditando(""); setProfesionalForm(profesionalVacio); }}>Cancelar</button>}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Admin;

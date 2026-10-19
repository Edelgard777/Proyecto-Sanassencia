import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import FormSuccess from "../components/FormSuccess";
import { claveCitaPendiente } from "../data/constantes";

function leerCita(location) {
  if (location.state?.cita) return location.state.cita;
  const guardada = window.sessionStorage.getItem(claveCitaPendiente);
  return guardada ? JSON.parse(guardada) : null;
}

function ResumenCita({ cita }) {
  return (
    <dl className="row reservation-summary">
      <dt className="col-sm-4">Nombre</dt><dd className="col-sm-8">{cita.nombre}</dd>
      <dt className="col-sm-4">Correo</dt><dd className="col-sm-8">{cita.correo}</dd>
      <dt className="col-sm-4">Teléfono</dt><dd className="col-sm-8">{cita.telefono}</dd>
      <dt className="col-sm-4">Especialidad</dt><dd className="col-sm-8">{cita.especialidad}</dd>
      <dt className="col-sm-4">Fecha</dt><dd className="col-sm-8">{cita.fecha}</dd>
      <dt className="col-sm-4">Modalidad</dt><dd className="col-sm-8">{cita.modalidad}</dd>
      {cita.mensaje && <><dt className="col-sm-4">Mensaje</dt><dd className="col-sm-8">{cita.mensaje}</dd></>}
    </dl>
  );
}

export function ConfirmacionAgenda() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cita] = useState(() => leerCita(location));

  useEffect(() => {
    if (!cita) navigate("/agenda", { replace: true });
  }, [cita, navigate]);

  if (!cita) return null;

  return (
    <main className="section">
      <div className="container">
        <div className="form-card reservation-card">
          <span className="eyebrow">CONFIRMA TUS DATOS</span>
          <h1>Revisa tu solicitud</h1>
          <p>La solicitud se guardó como pendiente. Revisa el resumen antes de finalizar.</p>
          <ResumenCita cita={cita} />
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-primary" type="button" onClick={() => navigate("/agenda/exito", { state: { cita } })}>
              Confirmar solicitud
            </button>
            <Link className="btn btn-secundario" to="/agenda" state={{ valores: cita }}>Editar datos</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export function AgendaExito() {
  const location = useLocation();
  const cita = leerCita(location);
  if (!cita) return <Navigate to="/agenda" replace />;

  return (
    <main className="section">
      <div className="container">
        <div className="form-card reservation-card">
          <FormSuccess
            title="Solicitud confirmada."
            message="El equipo SanaEsencia revisará la disponibilidad y se pondrá en contacto contigo."
          />
          {cita && <ResumenCita cita={cita} />}
          <Link className="btn btn-primary" to="/">Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}

export function AgendaError() {
  const { state } = useLocation();
  if (!state?.resumen) return <Navigate to="/agenda" replace />;
  return (
    <main className="section">
      <div className="container">
        <div className="form-card reservation-card">
          <div className="alert alert-danger" role="alert">
            <Icon name="close" /> No se pudo completar la reserva.
            {state?.mensaje && <p>{state.mensaje}</p>}
          </div>
          {state?.resumen && <ResumenCita cita={state.resumen} />}
          <Link className="btn btn-primary" to="/agenda">Volver a intentar</Link>
        </div>
      </div>
    </main>
  );
}

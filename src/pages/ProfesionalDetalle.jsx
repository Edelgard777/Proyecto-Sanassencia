import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import useColeccion from "../hooks/useColeccion";

function ProfesionalDetalle() {
  const { id } = useParams();
  const { registros: profesionales, loading, error } = useColeccion("profesionales");
  const profesional = profesionales.find((item) => item.id === id);

  if (error) {
    return <main className="section"><div className="container"><p className="alert alert-danger" role="alert">{error}</p></div></main>;
  }

  if (loading) {
    return <main className="section"><div className="container" role="status">Cargando perfil…</div></main>;
  }

  if (!profesional) {
    return (
      <main className="section">
        <div className="container">
          <EmptyState title="No encontramos a este profesional" message="Revisa el enlace o vuelve al equipo." />
          <Link className="btn btn-primary" to="/profesionales">Volver al equipo</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="form-card professional-profile">
          <div className="avatar">{profesional.iniciales}</div>
          <span className="eyebrow">EQUIPO SANAESENCIA</span>
          <h1>{profesional.nombre}</h1>
          <h2>{profesional.area}</h2>
          <p>{profesional.detalle}</p>
          <p>Modalidad de atención: {profesional.modalidad || "A coordinar"}.</p>
          <div className="d-flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/agenda">Agendar una hora</Link>
            <Link className="btn btn-secundario" to="/profesionales">Volver al equipo</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfesionalDetalle;

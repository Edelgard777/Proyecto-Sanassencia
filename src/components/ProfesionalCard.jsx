import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function ProfesionalCard({
  profesional = {},
  index = 0,
  compact = false,
}) {
  const {
    id = "",
    iniciales = "?",
    nombre = "Profesional",
    area = "Área de atención",
    detalle = "",
  } = profesional;

  if (compact) {
    return (
      <article className="col-12 col-md-6 col-lg-4">
        <div className="card professional-card h-100">
          <div className="avatar flex-shrink-0">{iniciales}</div>
          <div>
            <h3>{nombre}</h3>
            <strong>{area}</strong>
            <p>{detalle}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="col-12 col-md-6 col-lg-4">
      <div className="card pro-page-card h-100">
        <div className="pro-photo">
          <span>{iniciales}</span>
          <div className="pro-leaf"><Icon name="leaf" /></div>
        </div>
        <div className="card-body pro-card-body">
          <span className="eyebrow">PROFESIONAL {String(index + 1).padStart(2, "0")}</span>
          <h2>{nombre}</h2>
          <strong>{area}</strong>
          <p>{detalle}. Atención enfocada en construir un proceso cercano, seguro y adaptado a cada persona.</p>
          <Link to={`/profesionales/${id}`}>Ver perfil <Icon name="arrow" size={17} /></Link>
        </div>
      </div>
    </article>
  );
}

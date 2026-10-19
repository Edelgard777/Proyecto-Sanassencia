import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function EspecialidadCard({ especialidad = {} }) {
  const {
    id = "",
    icono = "leaf",
    nombre = "Especialidad",
    descripcion = "",
  } = especialidad;

  return (
    <article className="col-12 col-md-6 col-lg-4">
      <div className="card service-card h-100">
        <span className="icon-chip"><Icon name={icono} /></span>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <Link to={`/especialidades${id ? `#${id}` : ""}`}>
          Ver especialidad <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}

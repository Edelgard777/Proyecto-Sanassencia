import Icon from "../components/Icon";
import { especialidades } from "../data/datos";
import { Link } from "react-router-dom";

function Especialidades() {
  return <main><section className="page-hero"><div className="contenedor"><span className="eyebrow">NUESTROS SERVICIOS</span><h1>Especialidades para cuidar de ti</h1><p>Distintas áreas de atención conectadas por una misma mirada: acompañarte de forma cercana e integral.</p></div></section>
  <section className="section"><div className="contenedor specialty-list">{especialidades.map((e,i)=><article className="specialty-row" key={e.nombre}><div className="specialty-number">0{i+1}</div><div className="icon-chip large"><Icon name={e.icono} size={28}/></div><div><h2>{e.nombre}</h2><p>{e.descripcion} Cada proceso se adapta a tus necesidades, objetivos y etapa de vida.</p></div><Link className="round-arrow" to="/agenda" aria-label={`Agendar ${e.nombre}`}><Icon name="arrow"/></Link></article>)}</div></section></main>;
}
export default Especialidades;

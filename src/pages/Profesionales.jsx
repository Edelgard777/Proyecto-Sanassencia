import { useMemo, useState } from "react";
import { profesionales } from "../data/datos";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";

function Profesionales() {
  const [busqueda, setBusqueda] = useState("");
  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return profesionales;
    return profesionales.filter((p) => `${p.nombre} ${p.area} ${p.detalle}`.toLowerCase().includes(q));
  }, [busqueda]);

  return (
    <main>
      <section className="page-hero"><div className="contenedor"><span className="eyebrow">NUESTRO EQUIPO</span><h1>Personas que acompañan personas</h1><p>Profesionales comprometidos con ofrecerte un espacio de escucha, respeto y confianza.</p></div></section>
      <section className="section"><div className="contenedor">
        <div className="toolbar"><label className="search-box"><span>Buscar profesional o área</span><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ej: psicología" /></label><span className="result-count">{visibles.length} resultado{visibles.length === 1 ? "" : "s"}</span></div>
        <div className="pro-page-grid">
          {visibles.map((p, i) => <article className="pro-page-card" key={p.nombre}><div className="pro-photo"><span>{p.iniciales}</span><div className="pro-leaf"><Icon name="leaf" /></div></div><div className="pro-card-body"><span className="eyebrow">PROFESIONAL 0{i + 1}</span><h2>{p.nombre}</h2><strong>{p.area}</strong><p>{p.detalle}. Atención enfocada en construir un proceso cercano, seguro y adaptado a cada persona.</p><Link to="/agenda">Agendar atención <Icon name="arrow" size={17} /></Link></div></article>)}
        </div>
        {visibles.length === 0 && <div className="empty-state"><Icon name="person" size={30} /><h2>No encontramos coincidencias</h2><p>Prueba con otro nombre o especialidad.</p></div>}
      </div></section>
    </main>
  );
}
export default Profesionales;

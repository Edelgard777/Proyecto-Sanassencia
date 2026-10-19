import { useMemo, useState } from "react";
import SearchBox from "../components/SearchBox";
import ProfesionalCard from "../components/ProfesionalCard";
import EmptyState from "../components/EmptyState";
import useColeccion from "../hooks/useColeccion";

function Profesionales() {
  const { registros: profesionales, loading, error } = useColeccion("profesionales");
  const [busqueda, setBusqueda] = useState("");
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState("");

  const areas = useMemo(
    () => [...new Set(profesionales.map((profesional) => profesional.area).filter(Boolean))],
    [profesionales],
  );
  const modalidades = useMemo(
    () => [...new Set(profesionales.map((profesional) => profesional.modalidad).filter(Boolean))],
    [profesionales],
  );
  const visibles = useMemo(() => {
    const consulta = busqueda.trim().toLowerCase();
    return profesionales.filter((profesional) => {
      const coincideBusqueda = !consulta
        || `${profesional.nombre} ${profesional.area} ${profesional.detalle}`.toLowerCase().includes(consulta);
      const coincideArea = !areaSeleccionada || profesional.area === areaSeleccionada;
      const modalidadProfesional = (profesional.modalidad ?? "").toLowerCase();
      const modalidadesProfesional = modalidadProfesional.split(/\s+y\s+/);
      const coincideModalidad = !modalidadSeleccionada
        || modalidadProfesional === modalidadSeleccionada.toLowerCase()
        || modalidadesProfesional.includes(modalidadSeleccionada.toLowerCase());
      return coincideBusqueda && coincideArea && coincideModalidad;
    });
  }, [profesionales, busqueda, areaSeleccionada, modalidadSeleccionada]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">NUESTRO EQUIPO</span>
          <h1>Personas que acompañan personas</h1>
          <p>Profesionales comprometidos con ofrecerte un espacio de escucha, respeto y confianza.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row align-items-end g-3 toolbar">
            <SearchBox
              className="col-12 col-md-6 col-lg-4"
              label="Buscar profesional o área"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Ej: psicología"
            />
            <label className="col-12 col-md-3">
              <span>Área</span>
              <select className="form-select" value={areaSeleccionada} onChange={(event) => setAreaSeleccionada(event.target.value)}>
                <option value="">Todas las áreas</option>
                {areas.map((area) => <option key={area} value={area}>{area}</option>)}
              </select>
            </label>
            <label className="col-12 col-md-3">
              <span>Modalidad</span>
              <select className="form-select" value={modalidadSeleccionada} onChange={(event) => setModalidadSeleccionada(event.target.value)}>
                <option value="">Todas las modalidades</option>
                {modalidades.map((modalidad) => <option key={modalidad} value={modalidad}>{modalidad}</option>)}
              </select>
            </label>
            <p className="col-12 result-count text-end mb-0">
              {visibles.length} resultado{visibles.length === 1 ? "" : "s"}
            </p>
          </div>
          {error ? (
            <p className="alert alert-danger" role="alert">{error}</p>
          ) : loading ? (
            <p role="status">Cargando profesionales…</p>
          ) : visibles.length ? (
            <div className="row g-4">
              {visibles.map((profesional, index) => (
                <ProfesionalCard
                  key={profesional.id}
                  profesional={profesional}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No encontramos coincidencias"
              message="Prueba con otro nombre, área o modalidad."
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Profesionales;

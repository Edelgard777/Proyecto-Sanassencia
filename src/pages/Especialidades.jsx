import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import SearchBox from "../components/SearchBox";
import EmptyState from "../components/EmptyState";
import useColeccion from "../hooks/useColeccion";

function Especialidades() {
  const { registros: especialidades, loading, error } = useColeccion("especialidades");
  const [abierta, setAbierta] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const categorias = useMemo(
    () => [...new Set(especialidades.map((item) => item.categoria).filter(Boolean))],
    [especialidades],
  );
  const visibles = useMemo(() => {
    const consulta = busqueda.trim().toLowerCase();
    return especialidades.filter((item) => {
      const coincideConsulta = !consulta
        || `${item.nombre} ${item.descripcion} ${item.categoria ?? ""}`.toLowerCase().includes(consulta);
      return coincideConsulta
        && (!categoriaSeleccionada || item.categoria === categoriaSeleccionada);
    });
  }, [especialidades, busqueda, categoriaSeleccionada]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">NUESTROS SERVICIOS</span>
          <h1>Especialidades para cuidar de ti</h1>
          <p>Distintas áreas de atención conectadas por una misma mirada: acompañarte de forma cercana e integral.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row g-3 align-items-end mb-4">
            <SearchBox
              className="col-12 col-md-7"
              label="Buscar especialidad"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Ej: bienestar"
            />
            <label className="col-12 col-md-5">
              <span>Categoría</span>
              <select
                className="form-select"
                value={categoriaSeleccionada}
                onChange={(event) => setCategoriaSeleccionada(event.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </label>
          </div>
          {error ? (
            <p className="alert alert-danger" role="alert">{error}</p>
          ) : loading ? (
            <p role="status">Cargando especialidades…</p>
          ) : visibles.length ? (
            <div className="specialty-list">
              {visibles.map((especialidad, index) => (
                <article
                  className={`row specialty-row ${abierta === especialidad.id ? "expanded" : ""}`}
                  id={especialidad.id}
                  key={especialidad.id}
                >
                  <div className="col-auto specialty-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="col-auto d-none d-sm-block">
                    <span className="icon-chip large">
                      <Icon name={especialidad.icono} size={28} />
                    </span>
                  </div>
                  <div className="col">
                    <h2>{especialidad.nombre}</h2>
                    <p>{especialidad.descripcion}</p>
                    {abierta === especialidad.id && (
                      <p className="specialty-extra">
                        Cada proceso se adapta a tus necesidades, objetivos y etapa de vida.
                        Puedes solicitar una hora o escribirnos si necesitas orientación antes de elegir.
                      </p>
                    )}
                    <button
                      className="link-button"
                      type="button"
                      aria-expanded={abierta === especialidad.id}
                      onClick={() => setAbierta(abierta === especialidad.id ? null : especialidad.id)}
                    >
                      {abierta === especialidad.id ? "Ver menos" : "Más información"}
                    </button>
                  </div>
                  <div className="col-auto">
                    <Link
                      className="round-arrow"
                      to="/agenda"
                      aria-label={`Agendar ${especialidad.nombre}`}
                      title="Agendar atención"
                    >
                      <Icon name="arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No encontramos especialidades"
              message="Prueba con otra búsqueda o categoría."
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Especialidades;

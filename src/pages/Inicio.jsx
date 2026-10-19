import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Carrusel from "../components/Carrusel";
import EspecialidadCard from "../components/EspecialidadCard";
import ProfesionalCard from "../components/ProfesionalCard";
import useColeccion from "../hooks/useColeccion";
import carruselBienestar from "../assets/carrusel-bienestar.png";

function Inicio() {
  const especialidadesColeccion = useColeccion("especialidades");
  const profesionalesColeccion = useColeccion("profesionales");
  const especialidades = especialidadesColeccion.registros;
  const profesionales = profesionalesColeccion.registros;

  return (
    <main>
      <Carrusel />

      <section className="section intro-section">
        <div className="container">
          <div className="row align-items-end g-4">
            <div className="col-12 col-md-6"><span className="eyebrow">BIENESTAR INTEGRAL</span><h2>Te acompañamos en cada etapa</h2></div>
            <p className="col-12 col-md-6">En SanaEsencia reunimos distintas miradas y especialidades para ofrecerte un acompañamiento que considera a la persona de forma completa.</p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">NUESTRAS ÁREAS</span><h2>Especialidades pensadas para ti</h2><p>Conoce algunas de las formas en que podemos acompañarte.</p></div>
          {(especialidadesColeccion.error || profesionalesColeccion.error) && (
            <p className="alert alert-danger" role="alert">
              {especialidadesColeccion.error || profesionalesColeccion.error}
            </p>
          )}
          <div className="row g-4">
            {especialidades.map((item) => (
              <EspecialidadCard key={item.id ?? item.nombre} especialidad={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-12 col-lg-5">
              <div className="feature-image-card">
                <img src={carruselBienestar} alt="Elementos de bienestar y cuidado personal" />
                <div className="feature-image-label"><Icon name="heart" size={25} /><span>Un lugar para sentirte acompañado</span></div>
              </div>
            </div>
            <div className="col-12 col-lg-7 feature-copy">
              <span className="eyebrow">NUESTRA FORMA DE CUIDAR</span>
              <h2>Cercanía, confianza y atención personalizada</h2>
              <p>Sabemos que comenzar un proceso puede generar dudas. Por eso queremos que desde el primer contacto encuentres claridad, respeto y un trato humano.</p>
              <ul className="check-list">
                <li><Icon name="check" /> Profesionales comprometidos con tu proceso</li>
                <li><Icon name="check" /> Atención para distintas edades y necesidades</li>
                <li><Icon name="check" /> Alternativas presenciales y online</li>
              </ul>
              <Link className="text-link" to="/contacto">Resolver una duda <Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">EQUIPO SANAESENCIA</span><h2>Profesionales que te acompañan</h2><p>Conoce a quienes forman parte de nuestro equipo.</p></div>
          <div className="row g-3">
            {profesionales.map((profesional) => (
              <ProfesionalCard
                key={profesional.id ?? profesional.nombre}
                profesional={profesional}
                compact
              />
            ))}
          </div>
          <div className="center-action"><Link className="btn btn-secundario" to="/profesionales">Conocer al equipo <Icon name="arrow" size={18} /></Link></div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-card">
          <div><span className="eyebrow eyebrow-light">TU BIENESTAR IMPORTA</span><h2>¿Comenzamos?</h2><p>Agenda una atención y da el primer paso hacia un espacio de mayor bienestar.</p></div>
          <Link className="btn btn-primary btn-light" to="/agenda"><Icon name="calendar" size={19} /> Reservar una hora</Link>
        </div>
      </section>
    </main>
  );
}

export default Inicio;

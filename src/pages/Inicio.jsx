import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { especialidades, profesionales } from "../data/datos";

function Inicio() {
  return (
    <main>
      <section className="hero">
        <div className="leaf-pattern leaf-pattern-one" aria-hidden="true"></div>
        <div className="contenedor hero-grid">
          <div className="hero-contenido">
            <span className="eyebrow"><Icon name="leaf" size={16}/> CENTRO INTEGRATIVO SANAESENCIA</span>
            <h1>Un espacio para <em>volver a ti.</em></h1>
            <p className="hero-copy">Te acompañamos en tu bienestar emocional, físico y personal con una atención cercana, humana e integral.</p>
            <div className="hero-botones">
              <Link className="btn" to="/agenda"><Icon name="calendar" size={19}/> Agendar una hora</Link>
              <Link className="btn btn-secundario" to="/especialidades">Conocer especialidades <Icon name="arrow" size={18}/></Link>
            </div>
            <div className="hero-trust"><span><Icon name="check" size={17}/> Atención cercana</span><span><Icon name="check" size={17}/> Presencial y online</span></div>
          </div>

          <div className="hero-card" aria-label="Mensaje de bienestar">
            <div className="hero-card-icon"><Icon name="leaf" size={38}/></div>
            <p className="quote">“Cuidarte también es una forma de avanzar.”</p>
            <p>Encuentra un espacio seguro para escucharte, acompañarte y sentirte mejor.</p>
            <div className="mini-info"><Icon name="clock" size={20}/><span><strong>Agenda flexible</strong><small>Encuentra un horario que se adapte a ti</small></span></div>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="contenedor split-intro">
          <div><span className="eyebrow">BIENESTAR INTEGRAL</span><h2>Te acompañamos en cada etapa</h2></div>
          <p>En SanaEsencia reunimos distintas miradas y especialidades para ofrecerte un acompañamiento que considera a la persona de forma completa.</p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="contenedor">
          <div className="section-heading centered"><span className="eyebrow">NUESTRAS ÁREAS</span><h2>Especialidades pensadas para ti</h2><p>Conoce algunas de las formas en que podemos acompañarte.</p></div>
          <div className="cards-grid">
            {especialidades.map((item) => <article className="service-card" key={item.nombre}><span className="icon-chip"><Icon name={item.icono}/></span><h3>{item.nombre}</h3><p>{item.descripcion}</p><Link to="/especialidades">Ver más <Icon name="arrow" size={16}/></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contenedor feature-grid">
          <div className="feature-art"><div className="feature-art-inner"><Icon name="heart" size={42}/><span>Un lugar para sentirte acompañado</span></div></div>
          <div className="feature-copy"><span className="eyebrow">NUESTRA FORMA DE CUIDAR</span><h2>Cercanía, confianza y atención personalizada</h2><p>Sabemos que pedir ayuda o comenzar un proceso puede sentirse difícil. Por eso queremos que desde el primer contacto encuentres claridad, respeto y un trato humano.</p>
            <ul className="check-list"><li><Icon name="check"/> Profesionales comprometidos con tu proceso</li><li><Icon name="check"/> Atención para distintas edades y necesidades</li><li><Icon name="check"/> Alternativas presenciales y online</li></ul>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="contenedor">
          <div className="section-heading"><span className="eyebrow">EQUIPO SANAESENCIA</span><h2>Profesionales que te acompañan</h2></div>
          <div className="professional-grid">
            {profesionales.map(p => <article className="professional-card" key={p.nombre}><div className="avatar">{p.iniciales}</div><div><h3>{p.nombre}</h3><strong>{p.area}</strong><p>{p.detalle}</p></div></article>)}
          </div>
          <div className="center-action"><Link className="btn btn-secundario" to="/profesionales">Conocer al equipo <Icon name="arrow" size={18}/></Link></div>
        </div>
      </section>

      <section className="cta-section">
        <div className="contenedor cta-card"><div><span className="eyebrow eyebrow-light">TU BIENESTAR IMPORTA</span><h2>¿Comenzamos?</h2><p>Agenda una atención y da el primer paso hacia un espacio de mayor bienestar.</p></div><Link className="btn btn-light" to="/agenda"><Icon name="calendar" size={19}/> Reservar una hora</Link></div>
      </section>
    </main>
  );
}
export default Inicio;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { especialidades, profesionales } from "../data/datos";
import carruselSpa from "../assets/carrusel-spa.png";
import carruselBienestar from "../assets/carrusel-bienestar.png";
import carruselConsulta from "../assets/carrusel-consulta.png";

const slides = [
  {
    imagen: carruselSpa,
    etiqueta: "CENTRO INTEGRATIVO SANAESENCIA",
    titulo: "Un espacio para volver a ti",
    texto: "Te acompañamos en tu bienestar emocional, físico y personal con una atención cercana, humana e integral.",
  },
  {
    imagen: carruselBienestar,
    etiqueta: "BIENESTAR INTEGRAL",
    titulo: "Cuidarte también es una forma de avanzar",
    texto: "Descubre terapias y especialidades pensadas para ayudarte a reconectar contigo y sentirte mejor cada día.",
  },
  {
    imagen: carruselConsulta,
    etiqueta: "ATENCIÓN CERCANA",
    titulo: "Tu bienestar merece un espacio propio",
    texto: "Profesionales comprometidos, ambientes acogedores y un acompañamiento pensado para cada etapa de tu vida.",
  },
];

function Inicio() {
  const [slideActual, setSlideActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return undefined;
    const intervalo = window.setInterval(() => {
      setSlideActual((actual) => (actual + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(intervalo);
  }, [pausado]);

  const cambiarSlide = (direccion) => {
    setSlideActual((actual) => (actual + direccion + slides.length) % slides.length);
  };

  return (
    <main>
      <section
        className="hero-carousel"
        aria-label="Presentación de SanaEsencia"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        {slides.map((slide, index) => (
          <article
            className={`hero-slide ${index === slideActual ? "activo" : ""}`}
            key={slide.titulo}
            aria-hidden={index !== slideActual}
          >
            <img src={slide.imagen} alt="" className="hero-slide-imagen" />
            <div className="hero-overlay" />
            <div className="contenedor hero-slide-contenido">
              <div className="hero-texto">
                <span className="eyebrow hero-eyebrow"><Icon name="leaf" size={16} /> {slide.etiqueta}</span>
                <h1>{slide.titulo}</h1>
                <p className="hero-descripcion">{slide.texto}</p>
                <div className="hero-botones">
                  <Link className="btn" to="/agenda"><Icon name="calendar" size={19} /> Agendar una hora</Link>
                  <Link className="btn btn-carousel-light" to="/especialidades">Conocer especialidades <Icon name="arrow" size={18} /></Link>
                </div>
                <div className="hero-trust hero-trust-carousel">
                  <span><Icon name="check" size={17} /> Atención cercana</span>
                  <span><Icon name="check" size={17} /> Presencial y online</span>
                </div>
              </div>
            </div>
          </article>
        ))}

        <button className="carrusel-control carrusel-anterior" type="button" onClick={() => cambiarSlide(-1)} aria-label="Imagen anterior">‹</button>
        <button className="carrusel-control carrusel-siguiente" type="button" onClick={() => cambiarSlide(1)} aria-label="Imagen siguiente">›</button>

        <div className="carrusel-indicadores" aria-label="Seleccionar imagen del carrusel">
          {slides.map((slide, index) => (
            <button
              key={slide.titulo}
              type="button"
              className={`carrusel-punto ${index === slideActual ? "activo" : ""}`}
              onClick={() => setSlideActual(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === slideActual ? "true" : undefined}
            />
          ))}
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
            {especialidades.map((item) => (
              <article className="service-card" key={item.nombre}>
                <span className="icon-chip"><Icon name={item.icono} /></span>
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <Link to="/especialidades">Ver especialidad <Icon name="arrow" size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contenedor feature-grid">
          <div className="feature-image-card">
            <img src={carruselBienestar} alt="Elementos de bienestar y cuidado personal" />
            <div className="feature-image-label"><Icon name="heart" size={25} /><span>Un lugar para sentirte acompañado</span></div>
          </div>
          <div className="feature-copy">
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
      </section>

      <section className="section section-soft">
        <div className="contenedor">
          <div className="section-heading"><span className="eyebrow">EQUIPO SANAESENCIA</span><h2>Profesionales que te acompañan</h2><p>Conoce a quienes forman parte de nuestro equipo.</p></div>
          <div className="professional-grid">
            {profesionales.map((p) => (
              <article className="professional-card" key={p.nombre}>
                <div className="avatar">{p.iniciales}</div>
                <div><h3>{p.nombre}</h3><strong>{p.area}</strong><p>{p.detalle}</p></div>
              </article>
            ))}
          </div>
          <div className="center-action"><Link className="btn btn-secundario" to="/profesionales">Conocer al equipo <Icon name="arrow" size={18} /></Link></div>
        </div>
      </section>

      <section className="cta-section">
        <div className="contenedor cta-card">
          <div><span className="eyebrow eyebrow-light">TU BIENESTAR IMPORTA</span><h2>¿Comenzamos?</h2><p>Agenda una atención y da el primer paso hacia un espacio de mayor bienestar.</p></div>
          <Link className="btn btn-light" to="/agenda"><Icon name="calendar" size={19} /> Reservar una hora</Link>
        </div>
      </section>
    </main>
  );
}

export default Inicio;

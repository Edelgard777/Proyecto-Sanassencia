import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import carruselSpa from "../assets/carrusel-spa.png";
import carruselBienestar from "../assets/carrusel-bienestar.png";
import carruselConsulta from "../assets/carrusel-consulta.png";

const slidesPredeterminadas = [
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

export default function Carrusel({ slides = slidesPredeterminadas }) {
  const [slideActual, setSlideActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || slides.length < 2) return undefined;
    const intervalo = window.setInterval(() => {
      setSlideActual((actual) => (actual + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(intervalo);
  }, [pausado, slides.length]);

  if (!slides.length) return null;

  const cambiarSlide = (direccion) => {
    setSlideActual((actual) => (actual + direccion + slides.length) % slides.length);
  };

  return (
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
          <div className="container hero-slide-contenido">
            <div className="hero-texto">
              <span className="eyebrow hero-eyebrow">
                <Icon name="leaf" size={16} /> {slide.etiqueta}
              </span>
              <h1>{slide.titulo}</h1>
              <p className="hero-descripcion">{slide.texto}</p>
              <div className="hero-botones">
                <Link className="btn btn-primary" to="/agenda">
                  <Icon name="calendar" size={19} /> Agendar una hora
                </Link>
                <Link className="btn btn-carousel-light" to="/especialidades">
                  Conocer especialidades <Icon name="arrow" size={18} />
                </Link>
              </div>
              <div className="hero-trust hero-trust-carousel">
                <span><Icon name="check" size={17} /> Atención cercana</span>
                <span><Icon name="check" size={17} /> Presencial y online</span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {slides.length > 1 && (
        <>
          <button
            className="carrusel-control carrusel-anterior"
            type="button"
            onClick={() => cambiarSlide(-1)}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            className="carrusel-control carrusel-siguiente"
            type="button"
            onClick={() => cambiarSlide(1)}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
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
        </>
      )}
    </section>
  );
}

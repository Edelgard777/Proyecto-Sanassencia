import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Carrusel from "../components/Carrusel";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

const slides = [
  { imagen: "primera.png", etiqueta: "UNO", titulo: "Primera diapositiva", texto: "Descripción uno" },
  { imagen: "segunda.png", etiqueta: "DOS", titulo: "Segunda diapositiva", texto: "Descripción dos" },
];

describe("Carrusel", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra la diapositiva inicial y avanza y retrocede con controles", () => {
    const container = montar(<MemoryRouter><Carrusel slides={slides} /></MemoryRouter>);
    expect(container.textContent).toContain("Primera diapositiva");
    expect(container.querySelectorAll(".hero-slide")[0].getAttribute("aria-hidden")).toBe("false");
    act(() => container.querySelector('[aria-label="Imagen siguiente"]').click());
    expect(container.querySelectorAll(".hero-slide")[1].getAttribute("aria-hidden")).toBe("false");
    act(() => container.querySelector('[aria-label="Imagen anterior"]').click());
    expect(container.querySelectorAll(".hero-slide")[0].getAttribute("aria-hidden")).toBe("false");
  });

  it("permite seleccionar una diapositiva desde sus indicadores", () => {
    const container = montar(<MemoryRouter><Carrusel slides={slides} /></MemoryRouter>);
    act(() => container.querySelector('[aria-label="Ir a imagen 2"]').click());
    expect(container.querySelectorAll(".hero-slide")[1].getAttribute("aria-hidden")).toBe("false");
    expect(container.querySelector('[aria-label="Ir a imagen 2"]').getAttribute("aria-current")).toBe("true");
  });

  it("devuelve null cuando no recibe diapositivas", () => {
    const container = montar(<MemoryRouter><Carrusel slides={[]} /></MemoryRouter>);
    expect(container.querySelector(".hero-carousel")).toBeNull();
  });

  it("oculta los controles para una única diapositiva", () => {
    const container = montar(<MemoryRouter><Carrusel slides={[slides[0]]} /></MemoryRouter>);
    expect(container.querySelectorAll(".hero-slide").length).toBe(1);
    expect(container.querySelector(".carrusel-control")).toBeNull();
  });
});

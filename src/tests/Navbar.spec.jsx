import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("Navbar", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra todos los enlaces de navegación", () => {
    const container = montar(<MemoryRouter><Navbar /></MemoryRouter>);
    ["Inicio", "Especialidades", "Profesionales", "Agenda", "Contacto", "Administración"]
      .forEach((label) => expect(container.textContent).toContain(label));
  });

  it("abre y cierra el menú móvil actualizando su estado accesible", () => {
    const container = montar(<MemoryRouter><Navbar /></MemoryRouter>);
    const button = container.querySelector(".navbar-toggler");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    act(() => button.click());
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector("#sanaesencia-navbar").classList.contains("show")).toBeTrue();
    act(() => button.click());
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("cierra el menú al seleccionar una ruta", () => {
    const container = montar(<MemoryRouter><Navbar /></MemoryRouter>);
    const toggle = container.querySelector(".navbar-toggler");
    act(() => toggle.click());
    act(() => container.querySelector('a[href="/contacto"]').click());
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});

import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Especialidades from "../pages/Especialidades";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("Especialidades", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("filtra por categoría", () => {
    const container = montar(<MemoryRouter><Especialidades /></MemoryRouter>);
    cambiarValor(container.querySelector("select"), "Terapias complementarias");
    expect(container.textContent).toContain("Terapias integrativas");
    expect(container.textContent).not.toContain("Psicología");
  });

  it("busca especialidades y presenta el estado vacío sin coincidencias", () => {
    const container = montar(<MemoryRouter><Especialidades /></MemoryRouter>);
    cambiarValor(container.querySelector('input[type="search"]'), "consulta inexistente");
    expect(container.textContent).toContain("No encontramos especialidades");
    cambiarValor(container.querySelector('input[type="search"]'), "Psicología");
    expect(container.textContent).toContain("Psicología");
  });

  it("expande y contrae la información adicional", () => {
    const container = montar(<MemoryRouter><Especialidades /></MemoryRouter>);
    const button = container.querySelector("button.link-button");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    act(() => button.click());
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(container.textContent).toContain("Cada proceso se adapta a tus necesidades");
    act(() => button.click());
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("muestra un error explícito si falla la lectura de datos", () => {
    window.localStorage.setItem("sanaesencia:especialidades", "{");
    const container = montar(<MemoryRouter><Especialidades /></MemoryRouter>);
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });
});

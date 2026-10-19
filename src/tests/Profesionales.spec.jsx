import { MemoryRouter } from "react-router-dom";
import Profesionales from "../pages/Profesionales";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("Profesionales", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function renderizar() {
    return montar(<MemoryRouter><Profesionales /></MemoryRouter>);
  }

  it("renderiza todos los registros semilla", () => {
    const container = renderizar();
    expect(container.textContent).toContain("Camila Morales");
    expect(container.textContent).toContain("Francisca Vera");
    expect(container.textContent).toContain("Alejandra Pérez");
  });

  it("filtra la lista al escribir en el buscador", () => {
    const container = renderizar();
    cambiarValor(container.querySelector('input[type="search"]'), "Francisca");
    expect(container.textContent).toContain("Francisca Vera");
    expect(container.textContent).not.toContain("Camila Morales");
  });

  it("muestra el estado vacío solo cuando no existen coincidencias", () => {
    const container = renderizar();
    expect(container.textContent).not.toContain("No encontramos coincidencias");
    cambiarValor(container.querySelector('input[type="search"]'), "profesional inexistente");
    expect(container.textContent).toContain("No encontramos coincidencias");
  });

  it("filtra por área seleccionada", () => {
    const container = renderizar();
    cambiarValor(container.querySelector('select[aria-label="Área"]') ?? container.querySelectorAll("select")[0], "Terapias integrativas");
    expect(container.textContent).toContain("Alejandra Pérez");
    expect(container.textContent).not.toContain("Camila Morales");
  });

  it("filtra modalidad compuesta con selección online", () => {
    const container = renderizar();
    cambiarValor(container.querySelectorAll("select")[1], "Online");
    expect(container.textContent).toContain("Camila Morales");
    expect(container.textContent).toContain("Alejandra Pérez");
    expect(container.textContent).not.toContain("Francisca Vera");
  });

  it("presenta un error de persistencia si no puede leer profesionales", () => {
    window.localStorage.setItem("sanaesencia:profesionales", "{");
    const container = renderizar();
    expect(container.querySelector('[role="alert"]').textContent).toContain("JSON");
  });
});

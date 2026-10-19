import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProfesionalDetalle from "../pages/ProfesionalDetalle";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("ProfesionalDetalle", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function renderizar(id) {
    return montar(
      <MemoryRouter initialEntries={[`/profesionales/${id}`]}>
        <Routes><Route path="/profesionales/:id" element={<ProfesionalDetalle />} /></Routes>
      </MemoryRouter>,
    );
  }

  it("renderiza los datos para un identificador existente", () => {
    const container = renderizar("camila-morales");
    expect(container.textContent).toContain("Camila Morales");
    expect(container.textContent).toContain("Psicología clínica");
    expect(container.textContent).toContain("Presencial y online");
  });

  it("ofrece estado vacío para un identificador inexistente", () => {
    const container = renderizar("desconocido");
    expect(container.textContent).toContain("No encontramos a este profesional");
    expect(container.querySelector('a[href="/profesionales"]')).not.toBeNull();
  });

  it("muestra los errores de lectura del servicio", () => {
    window.localStorage.setItem("sanaesencia:profesionales", "{");
    const container = renderizar("camila-morales");
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });
});

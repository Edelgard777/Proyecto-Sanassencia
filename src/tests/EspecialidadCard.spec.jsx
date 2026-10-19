import { MemoryRouter } from "react-router-dom";
import EspecialidadCard from "../components/EspecialidadCard";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("EspecialidadCard", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra la especialidad recibida y enlaza a su identificador", () => {
    const container = montar(
      <MemoryRouter><div className="row"><EspecialidadCard especialidad={{
        id: "psicologia", icono: "brain", nombre: "Psicología", descripcion: "Apoyo emocional.",
      }} /></div></MemoryRouter>,
    );
    expect(container.textContent).toContain("Psicología");
    expect(container.textContent).toContain("Apoyo emocional.");
    expect(container.querySelector('a[href="/especialidades#psicologia"]')).not.toBeNull();
  });

  it("usa valores predeterminados cuando faltan props", () => {
    const container = montar(<MemoryRouter><div className="row"><EspecialidadCard /></div></MemoryRouter>);
    expect(container.textContent).toContain("Especialidad");
    expect(container.querySelector('a[href="/especialidades"]')).not.toBeNull();
  });
});

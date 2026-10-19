import { MemoryRouter } from "react-router-dom";
import ProfesionalCard from "../components/ProfesionalCard";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("ProfesionalCard", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra el nombre y área recibidos por props", () => {
    const container = montar(
      <MemoryRouter><div className="row"><ProfesionalCard profesional={{
        id: "lucia", iniciales: "LP", nombre: "Lucía Pérez", area: "Nutrición", detalle: "Adultos",
      }} /></div></MemoryRouter>,
    );
    expect(container.textContent).toContain("Lucía Pérez");
    expect(container.textContent).toContain("Nutrición");
  });

  it("usa valores por defecto y renderiza la variante compacta", () => {
    const container = montar(<div className="row"><ProfesionalCard compact /></div>);
    expect(container.textContent).toContain("Profesional");
    expect(container.textContent).toContain("Área de atención");
    expect(container.textContent).toContain("?");
  });
});

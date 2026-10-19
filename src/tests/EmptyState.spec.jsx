import EmptyState from "../components/EmptyState";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("EmptyState", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra título y mensaje personalizables", () => {
    const container = montar(<EmptyState title="Sin citas" message="Aún no tienes reservas." />);
    expect(container.textContent).toContain("Sin citas");
    expect(container.textContent).toContain("Aún no tienes reservas.");
  });

  it("renderiza los valores predeterminados", () => {
    const container = montar(<EmptyState />);
    expect(container.textContent).toContain("No encontramos resultados");
    expect(container.textContent).toContain("Prueba con otros términos.");
  });
});

import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("App", () => {
  beforeEach(() => {
    prepararPrueba();
    spyOn(window, "scrollTo").and.stub();
  });
  afterEach(desmontarTodo);

  it("muestra la página 404 en una ruta inexistente y desplaza al inicio", () => {
    const container = montar(<MemoryRouter initialEntries={["/ruta-inexistente"]}><App /></MemoryRouter>);
    expect(container.textContent).toContain("Página no encontrada");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("protege administración y redirige a login si no existe sesión", () => {
    const container = montar(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    expect(container.textContent).toContain("Iniciar sesión");
    expect(container.textContent).not.toContain("Panel administrador");
  });

  it("renderiza las páginas de inicio y especialidades", () => {
    const inicio = montar(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    expect(inicio.textContent).toContain("SanaEsencia");
    desmontarTodo();
    const especialidades = montar(<MemoryRouter initialEntries={["/especialidades"]}><App /></MemoryRouter>);
    expect(especialidades.textContent).toContain("Especialidades para cuidar de ti");
  });
});

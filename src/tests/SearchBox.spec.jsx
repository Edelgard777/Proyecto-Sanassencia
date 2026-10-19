import SearchBox from "../components/SearchBox";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("SearchBox", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("aplica los valores predeterminados y mantiene búsqueda controlada", () => {
    const container = montar(<SearchBox />);
    const input = container.querySelector("input");
    expect(container.textContent).toContain("Buscar");
    expect(input.name).toBe("busqueda");
    expect(input.placeholder).toBe("Escribe para buscar");
    expect(input.value).toBe("");
  });

  it("propaga cambios y opciones personalizadas por props", () => {
    const onChange = jasmine.createSpy("onChange");
    const container = montar(
      <SearchBox label="Profesional" name="buscar-profesional" placeholder="Nombre" onChange={onChange} className="col-md-6" />,
    );
    const input = container.querySelector("#buscar-profesional");
    expect(input.placeholder).toBe("Nombre");
    expect(container.querySelector("label").className).toContain("col-md-6");
    cambiarValor(input, "Camila");
    expect(onChange).toHaveBeenCalled();
  });
});

import { act } from "react";
import Button from "../components/Button";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("Button", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("muestra la etiqueta de props y llama onClick", () => {
    const onClick = jasmine.createSpy("onClick");
    const container = montar(<Button label="Guardar datos" onClick={onClick} />);
    act(() => container.querySelector("button").click());
    expect(container.textContent).toContain("Guardar datos");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("acepta children, variante y atributos nativos", () => {
    const container = montar(<Button variant="outline-danger" disabled aria-label="Borrar">Quitar</Button>);
    const button = container.querySelector("button");
    expect(button.textContent).toBe("Quitar");
    expect(button.className).toContain("btn-outline-danger");
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute("aria-label")).toBe("Borrar");
  });

  it("puede usar el callback vacío predeterminado sin error", () => {
    const container = montar(<Button label="Sin acción" />);
    expect(() => act(() => container.querySelector("button").click())).not.toThrow();
  });
});

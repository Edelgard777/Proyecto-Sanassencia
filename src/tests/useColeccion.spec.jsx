import { act } from "react";
import useColeccion from "../hooks/useColeccion";
import db from "../services/db";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

function ColeccionProbe() {
  const coleccion = useColeccion("citas");
  return (
    <section>
      <output>{coleccion.registros.map((registro) => registro.nombre).join(",")}</output>
      {coleccion.error && <p role="alert">{coleccion.error}</p>}
      <button type="button" onClick={() => coleccion.crear({ nombre: "Nueva desde hook" })}>Crear</button>
      <button
        type="button"
        onClick={() => {
          try {
            coleccion.actualizar("no existe", { nombre: "fallo" });
          } catch (error) {
            expect(error.message).toContain("No se encontró el registro");
          }
        }}
      >
        Actualizar inválida
      </button>
      <button type="button" onClick={coleccion.recargar}>Recargar</button>
    </section>
  );
}

describe("useColeccion", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  it("refleja las operaciones CRUD y escucha cambios de la colección", () => {
    const container = montar(<ColeccionProbe />);
    act(() => container.querySelector("button").click());
    expect(container.querySelector("output").textContent).toContain("Nueva desde hook");
    act(() => window.dispatchEvent(new CustomEvent(db.EVENT_NAME, { detail: { nombre: "otra" } })));
    expect(container.querySelector("output").textContent).toContain("Nueva desde hook");
    act(() => window.dispatchEvent(new CustomEvent(db.EVENT_NAME, { detail: { nombre: "citas" } })));
    expect(container.querySelector("output").textContent).toContain("Nueva desde hook");
  });

  it("recarga cambios de almacenamiento externos que corresponden a la colección", () => {
    const container = montar(<ColeccionProbe />);
    window.localStorage.setItem("sanaesencia:citas", JSON.stringify([{ id: "externa", nombre: "Pestaña externa" }]));
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "sanaesencia:citas" })));
    expect(container.querySelector("output").textContent).toContain("Pestaña externa");
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: null })));
    expect(container.querySelector("output").textContent).toContain("Pestaña externa");
  });

  it("captura errores iniciales y de operaciones, y permite recargar", () => {
    window.localStorage.setItem("sanaesencia:citas", "{");
    const container = montar(<ColeccionProbe />);
    expect(container.querySelector('[role="alert"]').textContent).toBeTruthy();
    window.localStorage.setItem("sanaesencia:citas", "[]");
    act(() => container.querySelectorAll("button")[2].click());
    expect(container.querySelector('[role="alert"]')).toBeNull();
    act(() => container.querySelectorAll("button")[1].click());
    expect(container.querySelector('[role="alert"]').textContent).toContain("No se encontró el registro");
  });
});

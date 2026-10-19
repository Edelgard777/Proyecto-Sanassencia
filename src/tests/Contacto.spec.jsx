import { act } from "react";
import Contacto from "../pages/Contacto";
import db from "../services/db";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("Contacto", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function completar(container) {
    cambiarValor(container.querySelector('[name="nombre"]'), "Paciente Sana");
    cambiarValor(container.querySelector('[name="correo"]'), "paciente@example.cl");
    cambiarValor(container.querySelector('[name="mensaje"]'), "Necesito información sobre la atención.");
  }

  it("muestra errores de validación y no crea mensaje con datos inválidos", () => {
    const crear = spyOn(db, "crear").and.callThrough();
    const container = montar(<Contacto />);
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.textContent).toContain("Ingresa al menos 3 caracteres.");
    expect(container.textContent).toContain("Escribe un mensaje de al menos 10 caracteres.");
    expect(crear).not.toHaveBeenCalled();
  });

  it("guarda y confirma un mensaje válido", () => {
    const crear = spyOn(db, "crear").and.callThrough();
    const container = montar(<Contacto />);
    completar(container);
    act(() => container.querySelector('button[type="submit"]').click());
    expect(crear).toHaveBeenCalledWith("mensajes", jasmine.objectContaining({ estado: "nuevo" }));
    expect(container.textContent).toContain("Mensaje guardado correctamente.");
  });

  it("presenta el error de servicio cuando falla el guardado", () => {
    spyOn(db, "crear").and.throwError("no hay almacenamiento");
    const container = montar(<Contacto />);
    completar(container);
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.querySelector('[role="alert"]').textContent).toContain("no hay almacenamiento");
  });
});

import db from "../services/db";
import { prepararPrueba } from "./testUtils";

describe("services/db", () => {
  beforeEach(prepararPrueba);

  it("crea, lee, consulta, actualiza y elimina registros", () => {
    const spySet = spyOn(window.localStorage, "setItem").and.callThrough();
    const creado = db.crear("citas", { nombre: "Paciente CRUD", estado: "pendiente" });
    expect(db.leer("citas")).toContain(jasmine.objectContaining({ id: creado.id }));
    expect(db.leerPorId("citas", creado.id).nombre).toBe("Paciente CRUD");
    expect(db.actualizar("citas", creado.id, { estado: "confirmada" }).estado).toBe("confirmada");
    expect(db.eliminar("citas", creado.id)).toBeTrue();
    expect(db.leerPorId("citas", creado.id)).toBeNull();
    expect(spySet).toHaveBeenCalled();
  });

  it("inicializa una colección vacía y persiste una semilla al leer por primera vez", () => {
    const get = spyOn(window.localStorage, "getItem").and.callThrough();
    const set = spyOn(window.localStorage, "setItem").and.callThrough();
    expect(db.leer("citas")).toEqual([]);
    expect(get).toHaveBeenCalledWith("sanaesencia:citas");
    expect(set).toHaveBeenCalledWith("sanaesencia:citas", "[]");
  });

  it("lanza un error claro cuando no existe el id al actualizar", () => {
    expect(() => db.actualizar("citas", "ausente", { estado: "confirmada" }))
      .toThrowError('No se encontró el registro "ausente" en "citas".');
  });

  it("rechaza datos almacenados con JSON inválido", () => {
    window.localStorage.setItem("sanaesencia:citas", "{");
    expect(() => db.leer("citas")).toThrowError();
  });

  it("rechaza JSON válido que no es una colección", () => {
    window.localStorage.setItem("sanaesencia:citas", JSON.stringify({ id: "objeto" }));
    expect(() => db.leer("citas")).toThrowError('Los datos guardados en "citas" no tienen un formato válido.');
  });

  it("valida colecciones y evita identificadores duplicados", () => {
    expect(() => db.leer("desconocida")).toThrowError('La colección "desconocida" no existe.');
    db.crear("citas", { id: "duplicada", nombre: "Paciente" });
    expect(() => db.crear("citas", { id: "duplicada", nombre: "Otro" })).toThrowError();
    expect(db.eliminar("citas", "inexistente")).toBeFalse();
  });
});

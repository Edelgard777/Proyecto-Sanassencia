import { act } from "react";
import Admin from "../pages/Admin";
import { AuthProvider } from "../contexts/AuthContext";
import db from "../services/db";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

const usuarioAdmin = { nombre: "Administración SanaEsencia", correo: "admin@sanaesencia.cl", role: "admin" };

describe("Admin", () => {
  beforeEach(() => {
    prepararPrueba();
    window.sessionStorage.setItem("sanaesencia:usuario", JSON.stringify(usuarioAdmin));
  });
  afterEach(desmontarTodo);

  function renderizar() {
    return montar(<AuthProvider><Admin /></AuthProvider>);
  }

  function llenarProfesional(container, nombre, area) {
    cambiarValor(container.querySelector('[name="nombre"]'), nombre);
    cambiarValor(container.querySelector('[name="area"]'), area);
  }

  it("actualiza el estado de una cita y permite eliminarla", () => {
    db.crear("citas", { id: "cita-admin", nombre: "Paciente Admin", correo: "a@b.cl", fecha: "2027-01-01", especialidad: "Psicología", estado: "pendiente" });
    const actualizar = spyOn(db, "actualizar").and.callThrough();
    const eliminar = spyOn(db, "eliminar").and.callThrough();
    const container = renderizar();
    const estado = container.querySelector('[aria-label="Estado de cita de Paciente Admin"]');
    cambiarValor(estado, "confirmada");
    expect(actualizar).toHaveBeenCalledWith("citas", "cita-admin", { estado: "confirmada" });
    expect(db.leerPorId("citas", "cita-admin").estado).toBe("confirmada");
    const fila = [...container.querySelectorAll("tr")].find((row) => row.textContent.includes("Paciente Admin"));
    act(() => fila.querySelector("button").click());
    expect(eliminar).toHaveBeenCalledWith("citas", "cita-admin");
    expect(db.leerPorId("citas", "cita-admin")).toBeNull();
  });

  it("crea un profesional a partir del formulario", () => {
    const crear = spyOn(db, "crear").and.callThrough();
    const container = renderizar();
    llenarProfesional(container, "Profesional Nuevo", "Terapia ocupacional");
    act(() => container.querySelector('button[type="submit"]').click());
    expect(crear).toHaveBeenCalledWith("profesionales", jasmine.objectContaining({
      nombre: "Profesional Nuevo",
      area: "Terapia ocupacional",
    }));
    expect(container.textContent).toContain("Profesional Nuevo");
  });

  it("edita un profesional existente conservando su identificador", () => {
    const original = db.crear("profesionales", {
      id: "prof-editar",
      nombre: "Nombre Original",
      area: "Área original",
      iniciales: "NO",
      categoria: "",
      modalidad: "Online",
      detalle: "",
    });
    const actualizar = spyOn(db, "actualizar").and.callThrough();
    const container = renderizar();
    const fila = [...container.querySelectorAll("tr")].find((row) => row.textContent.includes(original.nombre));
    act(() => [...fila.querySelectorAll("button")].find((button) => button.textContent === "Editar").click());
    llenarProfesional(container, "Nombre Actualizado", "Área actualizada");
    act(() => container.querySelector('button[type="submit"]').click());
    expect(actualizar).toHaveBeenCalledWith("profesionales", original.id, jasmine.objectContaining({
      nombre: "Nombre Actualizado",
      area: "Área actualizada",
    }));
    expect(db.leerPorId("profesionales", original.id).nombre).toBe("Nombre Actualizado");
  });

  it("valida los campos obligatorios y elimina profesionales", () => {
    const profesional = db.crear("profesionales", { id: "prof-borrar", nombre: "Borrar", area: "Prueba" });
    const container = renderizar();
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.querySelector('[role="alert"]').textContent).toContain("El nombre y el área son obligatorios.");
    const fila = [...container.querySelectorAll("tr")].find((row) => row.textContent.includes(profesional.nombre));
    act(() => [...fila.querySelectorAll("button")].find((button) => button.textContent === "Eliminar").click());
    expect(db.leerPorId("profesionales", "prof-borrar")).toBeNull();
  });

  it("lista y elimina mensajes recibidos", () => {
    const mensaje = db.crear("mensajes", {
      id: "mensaje-admin",
      nombre: "Paciente Mensaje",
      correo: "mensaje@example.cl",
      asunto: "Consulta",
      mensaje: "Necesito orientación.",
    });
    const eliminar = spyOn(db, "eliminar").and.callThrough();
    const container = renderizar();
    const fila = [...container.querySelectorAll("tr")].find((row) => row.textContent.includes(mensaje.nombre));
    act(() => fila.querySelector("button").click());
    expect(eliminar).toHaveBeenCalledWith("mensajes", "mensaje-admin");
    expect(db.leerPorId("mensajes", "mensaje-admin")).toBeNull();
  });

  it("cancela una edición y vuelve al formulario de creación", () => {
    const profesional = db.crear("profesionales", {
      id: "prof-cancelar",
      nombre: "Editar y cancelar",
      area: "Psicología",
      iniciales: "EC",
      modalidad: "Online",
    });
    const container = renderizar();
    const fila = [...container.querySelectorAll("tr")].find((row) => row.textContent.includes(profesional.nombre));
    act(() => [...fila.querySelectorAll("button")].find((button) => button.textContent === "Editar").click());
    expect(container.textContent).toContain("Editar profesional");
    act(() => [...container.querySelectorAll("button")].find((button) => button.textContent === "Cancelar").click());
    expect(container.textContent).toContain("Agregar profesional");
  });

  it("muestra errores del servicio al guardar un profesional", () => {
    spyOn(db, "crear").and.throwError("falló el servicio");
    const container = renderizar();
    llenarProfesional(container, "Profesional Error", "Área");
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.querySelector('[role="alert"]').textContent).toContain("falló el servicio");
  });

  it("cierra la sesión administrativa", () => {
    const container = renderizar();
    act(() => [...container.querySelectorAll("button")].find((button) => button.textContent.includes("Cerrar sesión")).click());
    expect(window.sessionStorage.getItem("sanaesencia:usuario")).toBeNull();
  });
});

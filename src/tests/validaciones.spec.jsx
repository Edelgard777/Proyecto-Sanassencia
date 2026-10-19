import { validarCita, validarMensaje } from "../utils/validaciones";
import { fechaFutura } from "./testUtils";

describe("validaciones", () => {
  it("acepta una cita válida con fecha futura", () => {
    expect(validarCita({
      nombre: "Paciente Sana",
      correo: "paciente@example.cl",
      telefono: "+56 9 1234 5678",
      especialidad: "Psicología",
      fecha: fechaFutura(),
    })).toEqual({});
  });

  it("valida cada campo de cita con datos inválidos", () => {
    const errores = validarCita({
      nombre: "  ",
      correo: "correo-invalido",
      telefono: "abc",
      especialidad: "",
      fecha: "fecha-imposible",
    });
    expect(errores).toEqual(jasmine.objectContaining({
      nombre: jasmine.any(String),
      correo: jasmine.any(String),
      telefono: jasmine.any(String),
      especialidad: jasmine.any(String),
      fecha: jasmine.any(String),
    }));
  });

  it("rechaza una fecha anterior al día actual", () => {
    expect(validarCita({
      nombre: "Paciente Sana",
      correo: "paciente@example.cl",
      telefono: "12345678",
      especialidad: "Psicología",
      fecha: "2000-01-01",
    }).fecha).toBeTruthy();
  });

  it("acepta un mensaje válido", () => {
    expect(validarMensaje({
      nombre: "Paciente Sana",
      correo: "paciente@example.cl",
      mensaje: "Necesito orientación sobre una consulta.",
    })).toEqual({});
  });

  it("rechaza nombre, correo y mensaje inválidos", () => {
    expect(validarMensaje({ nombre: "A", correo: "@", mensaje: "corto" })).toEqual(jasmine.objectContaining({
      nombre: jasmine.any(String),
      correo: jasmine.any(String),
      mensaje: jasmine.any(String),
    }));
  });
});

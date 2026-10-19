import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Agenda from "../pages/Agenda";
import { ConfirmacionAgenda, AgendaExito } from "../pages/ReservaResultado";
import { AuthProvider } from "../contexts/AuthContext";
import db from "../services/db";
import {
  cambiarValor,
  desmontarTodo,
  fechaFutura,
  montar,
  prepararPrueba,
} from "./testUtils";

describe("Agenda", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function renderizar() {
    return montar(
      <MemoryRouter initialEntries={["/agenda"]}>
        <AuthProvider>
          <Routes>
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/confirmacion" element={<ConfirmacionAgenda />} />
            <Route path="/agenda/exito" element={<AgendaExito />} />
            <Route path="/agenda/error" element={<p>Error de reserva</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
  }

  function completarFormulario(container) {
    cambiarValor(container.querySelector('[name="nombre"]'), "Paciente Sana");
    cambiarValor(container.querySelector('[name="correo"]'), "paciente@example.cl");
    cambiarValor(container.querySelector('[name="telefono"]'), "+56 9 1234 5678");
    cambiarValor(container.querySelector('[name="especialidad"]'), "Psicología");
    cambiarValor(container.querySelector('[name="fecha"]'), fechaFutura());
  }

  it("muestra errores de campo y no guarda datos inválidos", () => {
    const guardar = spyOn(db, "crear").and.callThrough();
    const container = renderizar();
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.textContent).toContain("Ingresa al menos 3 caracteres.");
    expect(container.textContent).toContain("Ingresa un correo válido.");
    expect(guardar).not.toHaveBeenCalled();
  });

  it("persiste una cita válida y permite confirmar la solicitud", () => {
    const guardar = spyOn(db, "crear").and.callThrough();
    const container = renderizar();
    completarFormulario(container);
    act(() => container.querySelector('button[type="submit"]').click());
    expect(guardar).toHaveBeenCalled();
    expect(container.textContent).toContain("Revisa tu solicitud");
    const confirmar = [...container.querySelectorAll("button")]
      .find((button) => button.textContent.includes("Confirmar solicitud"));
    act(() => confirmar.click());
    expect(container.textContent).toContain("Solicitud confirmada.");
  });

  it("actualiza en lugar de duplicar una cita al volver desde editar datos", () => {
    const cita = db.crear("citas", {
      nombre: "Paciente Sana",
      correo: "paciente@example.cl",
      telefono: "+56 9 1234 5678",
      especialidad: "Psicología",
      fecha: fechaFutura(),
      modalidad: "Presencial",
      estado: "pendiente",
    });
    const actualizar = spyOn(db, "actualizar").and.callThrough();
    const container = montar(
      <MemoryRouter initialEntries={[{ pathname: "/agenda", state: { valores: cita } }]}>
        <AuthProvider><Agenda /></AuthProvider>
      </MemoryRouter>,
    );
    cambiarValor(container.querySelector('[name="nombre"]'), "Paciente Editada");
    act(() => container.querySelector('button[type="submit"]').click());
    expect(actualizar).toHaveBeenCalledWith("citas", cita.id, jasmine.objectContaining({ nombre: "Paciente Editada" }));
    expect(db.leer("citas")).toHaveSize(1);
  });

  it("muestra error de persistencia cuando crear falla", () => {
    spyOn(db, "crear").and.throwError("almacenamiento no disponible");
    const container = renderizar();
    completarFormulario(container);
    act(() => container.querySelector('button[type="submit"]').click());
    expect(container.textContent).toContain("Error de reserva");
  });
});

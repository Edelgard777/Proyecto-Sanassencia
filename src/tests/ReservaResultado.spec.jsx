import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AgendaError, AgendaExito, ConfirmacionAgenda } from "../pages/ReservaResultado";
import { claveCitaPendiente } from "../data/constantes";
import { desmontarTodo, montar, prepararPrueba } from "./testUtils";

const cita = {
  id: "cita-resumen",
  nombre: "Paciente Sana",
  correo: "paciente@example.cl",
  telefono: "+56 9 1234 5678",
  especialidad: "Psicología",
  fecha: "2027-03-12",
  modalidad: "Online",
  mensaje: "Primera consulta",
};

describe("ReservaResultado", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function renderizar(path, state) {
    return montar(
      <MemoryRouter initialEntries={[{ pathname: path, state }]}>
        <Routes>
          <Route path="/agenda" element={<p>Formulario de agenda</p>} />
          <Route path="/agenda/confirmacion" element={<ConfirmacionAgenda />} />
          <Route path="/agenda/exito" element={<AgendaExito />} />
          <Route path="/agenda/error" element={<AgendaError />} />
        </Routes>
      </MemoryRouter>,
    );
  }

  it("resume los datos y permite editar la cita", () => {
    const container = renderizar("/agenda/confirmacion", { cita });
    expect(container.textContent).toContain("Paciente Sana");
    expect(container.textContent).toContain("Primera consulta");
    const editLink = container.querySelector('a[href="/agenda"]');
    expect(editLink.textContent).toContain("Editar datos");
    expect(editLink.getAttribute("href")).toBe("/agenda");
  });

  it("lee la cita de sessionStorage en la pantalla de éxito", () => {
    window.sessionStorage.setItem(claveCitaPendiente, JSON.stringify(cita));
    const container = renderizar("/agenda/exito", null);
    expect(container.textContent).toContain("Solicitud confirmada.");
    expect(container.textContent).toContain("Paciente Sana");
  });

  it("redirige a agenda si no hay datos para mostrar el éxito", () => {
    const container = renderizar("/agenda/exito", null);
    expect(container.textContent).toContain("Formulario de agenda");
  });

  it("muestra resumen y mensaje para un error de reserva", () => {
    const container = renderizar("/agenda/error", { resumen: cita, mensaje: "Error de almacenamiento" });
    expect(container.textContent).toContain("No se pudo completar la reserva.");
    expect(container.textContent).toContain("Error de almacenamiento");
    expect(container.textContent).toContain("Paciente Sana");
  });

  it("redirige si la ruta de error no recibe resumen", () => {
    const container = renderizar("/agenda/error", null);
    expect(container.textContent).toContain("Formulario de agenda");
  });
});

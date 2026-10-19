import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import { AuthProvider } from "../contexts/AuthContext";
import { act } from "react";
import { cambiarValor, desmontarTodo, montar, prepararPrueba } from "./testUtils";

describe("AdminLogin", () => {
  beforeEach(prepararPrueba);
  afterEach(desmontarTodo);

  function renderizar() {
    return montar(
      <MemoryRouter initialEntries={["/admin/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<p>Panel administrador</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
  }

  function ingresar(container, correo, contrasena) {
    cambiarValor(container.querySelector('[name="correo"]'), correo);
    cambiarValor(container.querySelector('[name="contrasena"]'), contrasena);
    act(() => container.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  }

  it("muestra un mensaje cuando las credenciales son incorrectas", () => {
    const container = renderizar();
    ingresar(container, "incorrecto@example.cl", "incorrecta");
    expect(container.querySelector('[role="alert"]').textContent).toContain("Credenciales inválidas");
    expect(container.textContent).not.toContain("Panel administrador");
  });

  it("inicia sesión con las credenciales demo y navega al panel", () => {
    const container = renderizar();
    ingresar(container, "admin@sanaesencia.cl", "admin123");
    expect(container.textContent).toContain("Panel administrador");
    expect(JSON.parse(window.sessionStorage.getItem("sanaesencia:usuario")).role).toBe("admin");
  });

  it("redirige al panel si ya existe una sesión administrativa", () => {
    window.sessionStorage.setItem("sanaesencia:usuario", JSON.stringify({
      nombre: "Administración SanaEsencia",
      correo: "admin@sanaesencia.cl",
      role: "admin",
    }));
    const container = renderizar();
    expect(container.textContent).toContain("Panel administrador");
  });
});

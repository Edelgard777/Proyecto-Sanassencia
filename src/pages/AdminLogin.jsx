import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import useAuth from "../hooks/useAuth.js";

function AdminLogin() {
  const { user, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  const enviar = (event) => {
    event.preventDefault();
    if (login(correo.trim(), contrasena)) {
      navigate(location.state?.from ?? "/admin", { replace: true });
      return;
    }
    setError("Credenciales inválidas. Usa la cuenta de administración de demostración.");
  };

  return (
    <main className="section">
      <div className="container">
        <form className="form-card login-card" onSubmit={enviar}>
          <span className="eyebrow">ACCESO ADMINISTRADOR</span>
          <h1>Iniciar sesión</h1>
          <p>Ingreso simulado para administrar solicitudes y profesionales.</p>
          <FormField
            label="Correo"
            name="correo"
            type="email"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            required
          />
          <FormField
            label="Contraseña"
            name="contrasena"
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            required
          />
          {error && <p className="text-danger" role="alert">{error}</p>}
          <button className="btn btn-primary" type="submit">Entrar</button>
          <small className="d-block mt-3">Cuenta demo: admin@sanaesencia.cl · Contraseña: admin123</small>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;

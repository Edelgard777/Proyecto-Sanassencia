import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContextCore.js";
import useAuth from "../hooks/useAuth.js";

const SESSION_KEY = "sanaesencia:usuario";

function leerUsuarioGuardado() {
  const usuario = window.sessionStorage.getItem(SESSION_KEY);
  return usuario ? JSON.parse(usuario) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(leerUsuarioGuardado);

  const login = (correo, contrasena) => {
    if (correo !== "admin@sanaesencia.cl" || contrasena !== "admin123") {
      return false;
    }
    const usuario = {
      nombre: "Administración SanaEsencia",
      correo,
      role: "admin",
    };
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
    setUser(usuario);
    return true;
  };

  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

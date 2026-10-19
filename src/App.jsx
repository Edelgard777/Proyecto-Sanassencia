import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Especialidades from "./pages/Especialidades";
import Profesionales from "./pages/Profesionales";
import Agenda from "./pages/Agenda";
import Contacto from "./pages/Contacto";
import ProfesionalDetalle from "./pages/ProfesionalDetalle";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { AgendaError, AgendaExito, ConfirmacionAgenda } from "./pages/ReservaResultado";
import Icon from "./components/Icon";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function NoEncontrada() {
  return <main className="not-found"><div className="container"><span className="eyebrow">404</span><h1>Página no encontrada</h1><p>La dirección que abriste no existe.</p><Link className="btn btn-primary" to="/"><Icon name="arrow" size={18} /> Volver al inicio</Link></div></main>;
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/profesionales" element={<Profesionales />} />
        <Route path="/profesionales/:id" element={<ProfesionalDetalle />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/agenda/confirmacion" element={<ConfirmacionAgenda />} />
        <Route path="/agenda/exito" element={<AgendaExito />} />
        <Route path="/agenda/error" element={<AgendaError />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;

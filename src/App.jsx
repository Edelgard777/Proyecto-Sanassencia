import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Especialidades from "./pages/Especialidades";
import Profesionales from "./pages/Profesionales";
import Agenda from "./pages/Agenda";
import Contacto from "./pages/Contacto";
import Icon from "./components/Icon";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function NoEncontrada() {
  return <main className="not-found"><div className="contenedor"><span className="eyebrow">404</span><h1>Página no encontrada</h1><p>La dirección que abriste no existe.</p><Link className="btn" to="/"><Icon name="arrow" size={18} /> Volver al inicio</Link></div></main>;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/profesionales" element={<Profesionales />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

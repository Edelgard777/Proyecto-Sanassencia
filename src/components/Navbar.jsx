import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icon";

const links = [
  ["/", "Inicio"],
  ["/especialidades", "Especialidades"],
  ["/profesionales", "Profesionales"],
  ["/agenda", "Agenda"],
  ["/contacto", "Contacto"],
  ["/admin", "Administración"],
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="brand navbar-brand">
            <span className="brand-mark"><Icon name="leaf" size={27} /></span>
            <span><strong>SanaEsencia</strong><small>Centro de bienestar</small></span>
          </Link>

          <button className="navbar-toggler" type="button" aria-controls="sanaesencia-navbar" aria-expanded={menuAbierto} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuAbierto((abierto) => !abierto)}>
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse${menuAbierto ? " show" : ""}`} id="sanaesencia-navbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {links.map(([to, label]) => (
                <li key={to}>
                  <NavLink className="nav-link" to={to} end={to === "/"} onClick={() => setMenuAbierto(false)}>{label}</NavLink>
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary btn-nav ms-lg-3" to="/agenda" onClick={() => setMenuAbierto(false)}>
              <Icon name="calendar" size={18} /> Agendar hora
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

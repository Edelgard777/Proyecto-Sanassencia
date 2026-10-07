import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icon";

const links = [
  ["/", "Inicio"],
  ["/especialidades", "Especialidades"],
  ["/profesionales", "Profesionales"],
  ["/agenda", "Agenda"],
  ["/contacto", "Contacto"],
];

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  return (
    <header className="site-header">
      <nav className="navbar contenedor" aria-label="Navegación principal">
        <Link to="/" className="brand" onClick={() => setAbierto(false)}>
          <span className="brand-mark"><Icon name="leaf" size={27} /></span>
          <span><strong>SanaEsencia</strong><small>Centro de bienestar</small></span>
        </Link>

        <button className="menu-btn" onClick={() => setAbierto(!abierto)} aria-label="Abrir menú" aria-expanded={abierto}>
          <Icon name={abierto ? "close" : "menu"} size={25} />
        </button>

        <div className={`nav-wrap ${abierto ? "is-open" : ""}`}>
          <ul className="nav-links">
            {links.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} onClick={() => setAbierto(false)}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <Link className="btn btn-nav" to="/agenda" onClick={() => setAbierto(false)}>
            <Icon name="calendar" size={18} /> Agendar hora
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

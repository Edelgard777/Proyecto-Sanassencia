import { Link } from "react-router-dom";
import Icon from "./Icon";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="contenedor footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-footer">
            <span className="brand-mark"><Icon name="leaf" size={27} /></span>
            <span><strong>SanaEsencia</strong><small>Centro de bienestar</small></span>
          </Link>
          <p>Un espacio cercano para cuidar tu bienestar de forma integral y consciente.</p>
        </div>
        <div>
          <h3>Explora</h3>
          <Link to="/">Inicio</Link>
          <Link to="/especialidades">Especialidades</Link>
          <Link to="/profesionales">Profesionales</Link>
          <Link to="/agenda">Agenda</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div>
          <h3>Atención</h3>
          <p><Icon name="clock" size={17} /> Horarios según disponibilidad</p>
          <p><Icon name="person" size={17} /> Atención presencial y online</p>
          <Link to="/contacto"><Icon name="mail" size={17} /> Enviar una consulta</Link>
        </div>
      </div>
      <div className="contenedor footer-bottom"><span>© 2026 Centro Integrativo SanaEsencia</span><span>Bienestar con cercanía y propósito.</span></div>
    </footer>
  );
}
export default Footer;

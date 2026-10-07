import { Link } from "react-router-dom";
import Icon from "./Icon";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="contenedor footer-grid">
        <div className="footer-brand">
          <div className="brand brand-footer">
            <span className="brand-mark"><Icon name="leaf" size={27} /></span>
            <span><strong>SanaEsencia</strong><small>Centro de bienestar</small></span>
          </div>
          <p>Un espacio cercano para cuidar tu bienestar de forma integral y consciente.</p>
        </div>
        <div>
          <h3>Explora</h3>
          <Link to="/especialidades">Especialidades</Link>
          <Link to="/profesionales">Profesionales</Link>
          <Link to="/agenda">Agenda</Link>
        </div>
        <div>
          <h3>Contacto</h3>
          <p><Icon name="map" size={17} /> Caupolicán 220, Los Vilos</p>
          <p><Icon name="mail" size={17} /> contacto@sanaesencia.cl</p>
          <p><Icon name="phone" size={17} /> +56 9 1234 5678</p>
        </div>
      </div>
      <div className="contenedor footer-bottom">
        <span>© 2026 Centro Integrativo SanaEsencia</span>
        <span>Bienestar con cercanía y propósito.</span>
      </div>
    </footer>
  );
}
export default Footer;

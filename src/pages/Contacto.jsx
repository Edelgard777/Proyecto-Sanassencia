import { useState } from "react";
import Icon from "../components/Icon";

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const enviar = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setEnviado(true);
    e.currentTarget.reset();
  };

  return (
    <main>
      <section className="page-hero"><div className="contenedor"><span className="eyebrow">HABLEMOS</span><h1>Estamos cerca de ti</h1><p>Escríbenos si tienes dudas sobre nuestras atenciones, profesionales o proceso de agendamiento.</p></div></section>
      <section className="section"><div className="contenedor contact-grid">
        <div className="contact-cards">
          <article><span className="icon-chip"><Icon name="map" /></span><h3>Visítanos</h3><p>Consulta la ubicación del centro antes de tu atención.</p></article>
          <article><span className="icon-chip"><Icon name="phone" /></span><h3>Contáctanos</h3><p>Podrás incorporar aquí el teléfono oficial del centro.</p></article>
          <article><span className="icon-chip"><Icon name="mail" /></span><h3>Correo</h3><p>Podrás incorporar aquí el correo oficial.</p></article>
          <article><span className="icon-chip"><Icon name="instagram" /></span><h3>Redes sociales</h3><p>Agrega el perfil oficial para mantener informados a tus pacientes.</p></article>
        </div>
        <form className="form-card" onSubmit={enviar}>
          <h2>Envíanos un mensaje</h2>
          <p className="form-intro">Déjanos tu consulta y tus datos de contacto.</p>
          <label>Nombre<input name="nombre" placeholder="Tu nombre" required minLength="3" /></label>
          <label>Correo<input name="correo" type="email" placeholder="tu@correo.com" required /></label>
          <label>Asunto<select name="asunto" defaultValue="Consulta general"><option>Consulta general</option><option>Especialidades</option><option>Profesionales</option><option>Agendamiento</option></select></label>
          <label>Mensaje<textarea name="mensaje" rows="5" placeholder="Escribe tu consulta" required minLength="10"></textarea></label>
          <button className="btn" type="submit">Enviar mensaje <Icon name="arrow" size={18} /></button>
          {enviado && <div className="form-success" role="status"><Icon name="check" size={18} /><span><strong>Mensaje preparado correctamente.</strong> Cuando conectemos el backend, este formulario podrá enviarlo al centro.</span></div>}
        </form>
      </div></section>
    </main>
  );
}
export default Contacto;

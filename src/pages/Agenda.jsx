import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { especialidades } from "../data/datos";

function Agenda() {
  const [enviado, setEnviado] = useState(false);
  const hoy = useMemo(() => new Date().toISOString().split("T")[0], []);

  const enviar = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setEnviado(true);
    e.currentTarget.reset();
  };

  return (
    <main>
      <section className="page-hero"><div className="contenedor"><span className="eyebrow">AGENDA TU ATENCIÓN</span><h1>Reserva un espacio para ti</h1><p>Completa tus datos y podremos revisar tu solicitud de atención.</p></div></section>
      <section className="section"><div className="contenedor agenda-grid">
        <form className="form-card" onSubmit={enviar}>
          <h2>Solicitud de hora</h2>
          <p className="form-intro">Ingresa tus datos y selecciona tus preferencias.</p>
          <div className="field-row">
            <label>Nombre completo<input name="nombre" type="text" placeholder="Tu nombre" required minLength="3" /></label>
            <label>Correo electrónico<input name="correo" type="email" placeholder="tu@correo.com" required /></label>
          </div>
          <div className="field-row">
            <label>Teléfono<input name="telefono" type="tel" placeholder="+56 9 ..." required pattern="[0-9+() -]{8,20}" /></label>
            <label>Especialidad<select name="especialidad" defaultValue="" required><option value="" disabled>Selecciona una opción</option>{especialidades.map((e) => <option key={e.nombre}>{e.nombre}</option>)}</select></label>
          </div>
          <div className="field-row">
            <label>Fecha preferida<input name="fecha" type="date" min={hoy} required /></label>
            <label>Modalidad<select name="modalidad" defaultValue="Presencial"><option>Presencial</option><option>Online</option></select></label>
          </div>
          <label>Cuéntanos brevemente<textarea name="mensaje" rows="4" placeholder="¿Cómo podemos ayudarte?"></textarea></label>
          <button className="btn" type="submit"><Icon name="calendar" size={19} /> Solicitar hora</button>
          <small className="privacy"><Icon name="check" size={15} /> Tu información será tratada de forma confidencial.</small>
          {enviado && <div className="form-success" role="status"><Icon name="check" size={18} /><span><strong>Solicitud registrada.</strong> Esta demostración funciona en el navegador; al conectar el backend podrá enviarse al centro.</span></div>}
        </form>
        <aside className="agenda-info">
          <span className="icon-chip large"><Icon name="heart" size={28} /></span><h2>Estamos para orientarte</h2><p>Si no sabes qué especialidad elegir, cuéntanos qué necesitas y podremos orientarte.</p>
          <div className="info-line"><Icon name="clock" /><div><strong>Horario referencial</strong><span>Lunes a viernes · 09:00 a 19:00</span></div></div>
          <div className="info-line"><Icon name="map" /><div><strong>Atención</strong><span>Modalidad presencial y online según profesional</span></div></div>
        </aside>
      </div></section>
    </main>
  );
}
export default Agenda;

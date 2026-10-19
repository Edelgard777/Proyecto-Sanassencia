export function validarCita(formulario) {
  const errores = {};
  if (formulario.nombre.trim().length < 3) errores.nombre = "Ingresa al menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) errores.correo = "Ingresa un correo válido.";
  if (!/^[0-9+() -]{8,20}$/.test(formulario.telefono.trim())) errores.telefono = "Ingresa un teléfono válido.";
  if (!formulario.especialidad) errores.especialidad = "Selecciona una especialidad.";
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(`${formulario.fecha}T00:00:00`);
  if (!formulario.fecha || Number.isNaN(fecha.getTime()) || fecha < hoy) {
    errores.fecha = "Selecciona una fecha válida, desde hoy en adelante.";
  }
  return errores;
}

export function validarMensaje(formulario) {
  const errores = {};
  if (formulario.nombre.trim().length < 3) errores.nombre = "Ingresa al menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) errores.correo = "Ingresa un correo válido.";
  if (formulario.mensaje.trim().length < 10) errores.mensaje = "Escribe un mensaje de al menos 10 caracteres.";
  return errores;
}

import { especialidades as especialidadesIniciales, profesionales as profesionalesIniciales } from "../data/datos.jsx";

const STORAGE_PREFIX = "sanaesencia:";
const EVENT_NAME = "sanaesencia:coleccion-actualizada";
const colecciones = {
  citas: [],
  mensajes: [],
  profesionales: profesionalesIniciales,
  especialidades: especialidadesIniciales,
};

function validarColeccion(nombre) {
  if (!Object.hasOwn(colecciones, nombre)) {
    throw new Error(`La colección "${nombre}" no existe.`);
  }
}

function obtenerStorage() {
  if (typeof window === "undefined" || !window.localStorage) {
    throw new Error("La persistencia requiere un navegador con localStorage disponible.");
  }
  return window.localStorage;
}

function emitirCambio(nombre) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { nombre } }));
}

export function leer(nombre) {
  validarColeccion(nombre);
  const storage = obtenerStorage();
  const clave = `${STORAGE_PREFIX}${nombre}`;
  const guardado = storage.getItem(clave);

  if (guardado === null) {
    const semilla = colecciones[nombre].map((registro) => ({ ...registro }));
    storage.setItem(clave, JSON.stringify(semilla));
    return semilla;
  }

  const registros = JSON.parse(guardado);
  if (!Array.isArray(registros)) {
    throw new Error(`Los datos guardados en "${nombre}" no tienen un formato válido.`);
  }
  return registros;
}

export function leerPorId(nombre, id) {
  return leer(nombre).find((registro) => registro.id === id) ?? null;
}

export function crear(nombre, datos) {
  const registros = leer(nombre);
  const id = datos.id ?? globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  if (registros.some((registro) => registro.id === id)) {
    throw new Error(`Ya existe un registro con id "${id}" en "${nombre}".`);
  }
  const nuevoRegistro = { ...datos, id };
  obtenerStorage().setItem(`${STORAGE_PREFIX}${nombre}`, JSON.stringify([...registros, nuevoRegistro]));
  emitirCambio(nombre);
  return nuevoRegistro;
}

export function actualizar(nombre, id, cambios) {
  const registros = leer(nombre);
  const indice = registros.findIndex((registro) => registro.id === id);
  if (indice === -1) {
    throw new Error(`No se encontró el registro "${id}" en "${nombre}".`);
  }
  const actualizado = { ...registros[indice], ...cambios, id };
  const nuevosRegistros = registros.map((registro, posicion) => posicion === indice ? actualizado : registro);
  obtenerStorage().setItem(`${STORAGE_PREFIX}${nombre}`, JSON.stringify(nuevosRegistros));
  emitirCambio(nombre);
  return actualizado;
}

export function eliminar(nombre, id) {
  const registros = leer(nombre);
  const nuevosRegistros = registros.filter((registro) => registro.id !== id);
  if (nuevosRegistros.length === registros.length) {
    return false;
  }
  obtenerStorage().setItem(`${STORAGE_PREFIX}${nombre}`, JSON.stringify(nuevosRegistros));
  emitirCambio(nombre);
  return true;
}

export { EVENT_NAME };
export default { crear, leer, leerPorId, actualizar, eliminar, EVENT_NAME };

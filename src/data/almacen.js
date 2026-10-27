import { serviciosIniciales, profesionalesIniciales } from './semillas.js';
const prefijo = 'sanaesencia_web_v2_';
const clonar = o => JSON.parse(JSON.stringify(o));
export function leer(coleccion) {
  const originales = {servicios: serviciosIniciales, profesionales: profesionalesIniciales, usuarios: [], citas: [], mensajes: []};
  if (!(coleccion in originales)) throw new Error('Colección inválida');
  try { const raw = localStorage.getItem(prefijo + coleccion); return raw === null ? clonar(originales[coleccion]) : JSON.parse(raw); }
  catch { return clonar(originales[coleccion]); }
}
export function guardar(coleccion, items) { localStorage.setItem(prefijo + coleccion, JSON.stringify(items)); window.dispatchEvent(new Event('sana:datos')); return items; }
export function crear(coleccion, item) { const items = leer(coleccion); const nuevo={...item,id: crypto.randomUUID()}; guardar(coleccion,[...items,nuevo]); return nuevo; }
export function actualizar(coleccion,id,cambios) { const items=leer(coleccion).map(x=>String(x.id)===String(id)?{...x,...cambios,id:x.id}:x); guardar(coleccion,items); return items.find(x=>String(x.id)===String(id)); }
export function eliminar(coleccion,id) { guardar(coleccion,leer(coleccion).filter(x=>String(x.id)!==String(id))); }
export function validarClave(c) { return c.length>=8 && /[A-Z]/.test(c) && /[^a-zA-Z0-9]/.test(c); }
export function validarNombre(n) { return n.trim().length>0; }
export function fechaLocal(d = new Date()) { const yy=d.getFullYear(), mm=String(d.getMonth()+1).padStart(2,'0'), dd=String(d.getDate()).padStart(2,'0'); return `${yy}-${mm}-${dd}`; }
export function disponible(citas, profesionalId, fecha, hora, excluida=null) {return !citas.some(c=>c.id!==excluida && c.profesionalId===Number(profesionalId) && c.fecha===fecha && c.hora===hora && c.estado!=='Cancelada'); }
export const horas = ['09:00','10:00','11:00','12:00','15:00','16:00','17:00','18:00'];
export function useDatos(nombre) { /* lectura simple; el refresco lo controla el proveedor de contexto */ return leer(nombre); }

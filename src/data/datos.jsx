import {serviciosIniciales,profesionalesIniciales} from './semillas';
const icons=['brain','brain','users','heart','sparkle','leaf','heart'];
export const especialidades=serviciosIniciales.map((s,i)=>({...s,icono:icons[i]}));
export const profesionales=profesionalesIniciales.map(p=>({nombre:p.nombre,iniciales:p.nombre.split(' ').slice(-2).map(x=>x[0]).join(''),area:serviciosIniciales.find(s=>s.id===p.especialidadId)?.nombre||'',detalle:p.modalidad}));

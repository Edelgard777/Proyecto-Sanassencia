import { createContext, useContext, useEffect, useState } from 'react';
import { leer } from '../data/almacen.js';
const Contexto = createContext(null);
export function SanaProvider({ children }) {
  const [version,setVersion]=useState(0);
  const [sesion,setSesion]=useState(()=>{try{return JSON.parse(sessionStorage.getItem('sana_sesion')||'null')}catch{return null}});
  useEffect(()=>{const handler=()=>setVersion(v=>v+1); window.addEventListener('sana:datos',handler);window.addEventListener('storage',handler);return()=>{window.removeEventListener('sana:datos',handler);window.removeEventListener('storage',handler)}},[]);
  const ingresar=(usuario)=>{const ses={id:usuario.id,nombre:usuario.nombre,correo:usuario.correo,rol:usuario.rol}; sessionStorage.setItem('sana_sesion',JSON.stringify(ses));setSesion(ses)};
  const salir=()=>{sessionStorage.removeItem('sana_sesion');setSesion(null)};
  return <Contexto.Provider value={{sesion,ingresar,salir,servicios:leer('servicios'),profesionales:leer('profesionales'),citas:leer('citas'),usuarios:leer('usuarios'),version}}>{children}</Contexto.Provider>
}
export const useSana=()=>useContext(Contexto);

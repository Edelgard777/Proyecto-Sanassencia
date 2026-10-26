import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useSana} from '../context/SanaContext';
import {crear,validarClave,validarNombre} from '../data/almacen';
export default function Acceso({registro=false}) {
 const {usuarios,ingresar}=useSana(), navegar=useNavigate();
 const [nombre,setNombre]=useState(''),[correo,setCorreo]=useState(''),[clave,setClave]=useState(''),[error,setError]=useState(''),[tocados,setTocados]=useState({});
 const enviar=e=>{e.preventDefault();setError('');let mail=correo.trim().toLowerCase();if(registro){if(!validarNombre(nombre)||!validarClave(clave)){setError('Revisa el nombre y los requisitos de contraseña.');return}if(usuarios.some(u=>u.correo===mail)){setError('Este correo ya está registrado.');return}const u=crear('usuarios',{nombre:nombre.trim(),correo:mail,clave,rol:'PACIENTE'});ingresar(u);navegar('/mi-cuenta');return}const u=usuarios.find(u=>u.correo===mail&&u.clave===clave);if(!u){setError('Correo o contraseña incorrectos.');return}ingresar(u);navegar(u.rol==='ADMIN'?'/administracion':'/mi-cuenta')};
 return <main><section className="page-hero"><div className="contenedor"><span className="eyebrow">TU ESPACIO SANAESENCIA</span><h1>{registro?'Crear cuenta':'Iniciar sesión'}</h1><p>Gestiona tus próximas atenciones con tranquilidad.</p></div></section><section className="section"><form className="form-card auth-card" onSubmit={enviar}>
 {registro&&<label>Nombre completo<input value={nombre} onBlur={()=>setTocados(x=>({...x,nombre:true}))} onChange={e=>{setNombre(e.target.value);setTocados(x=>({...x,nombre:true}))}} className={tocados.nombre?(validarNombre(nombre)?'valid':'invalid'):''} required placeholder="Tu nombre" /></label>}
 <label>Correo electrónico<input type="email" required value={correo} onChange={e=>setCorreo(e.target.value)} placeholder="correo@ejemplo.cl" /></label>
 <label>Contraseña<input type="password" required value={clave} onFocus={()=>setTocados(x=>({...x,clave:true}))} onChange={e=>{setClave(e.target.value);setTocados(x=>({...x,clave:true}))}} className={registro&&tocados.clave?(validarClave(clave)?'valid':'invalid'):''} /></label>
 {registro&&<small>Al menos 8 caracteres, una mayúscula y un carácter especial. El borde se vuelve verde cuando cumple.</small>}
 {error&&<p role="alert" className="alerta-error">{error}</p>}<button className="btn" type="submit">{registro?'Crear mi cuenta':'Ingresar'}</button><p>{registro?'¿Ya tienes cuenta?':'¿Aún no tienes cuenta?'} <Link className="text-link" to={registro?'/ingresar':'/registro'}>{registro?'Iniciar sesión':'Regístrate'}</Link></p><p className="demo-note">Demostración académica: los datos se almacenan localmente en este navegador. No uses contraseñas reales.</p>
 </form></section></main>
}

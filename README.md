# SanaEsencia Web — Evaluación 2

Proyecto React + Vite adaptado de la rama Mark a partir de la app Android y la pauta docente. Mantiene la estética verde/crema y el carrusel.

## Inicio

Requisitos: Node.js 20.19+ o 22.12+. En VS Code abrir esta carpeta y ejecutar:

```bash
npm install
npm run dev
```

Abrir la URL de Vite (habitualmente http://localhost:5173). Compilación: `npm run build`.

## Funcionalidades
- Inicio, especialidades, profesionales, contacto, catálogo por categorías y ofertas.
- Registro con validaciones visuales de nombre y contraseña, inicio y cierre de sesión.
- Reserva con selección de especialidad, modalidad, profesional, fecha y horarios; bloquea reservas duplicadas.
- Checkout **simulado**, resultado exitoso/fallido y comprobante; mis citas y cancelación.
- Perfil editable y panel de administración con CRUD de servicios y profesionales, listado de usuarios, estados de citas y reportes.
- `src/data/semillas.js`: 7 especialidades y 30 especialistas tomados del catálogo Android adjunto; no se inventaron precios.
- `src/data/almacen.js`: persistencia CRUD con `localStorage`. El carrito tradicional se adaptó a reserva de un servicio clínico (un turno por atención).
- Bootstrap 5 cargado y media queries propias.

## Acceso administrativo de demostración
No hay credenciales administrativas predeterminadas inseguras. Crea primero un usuario desde `/registro`; en la consola del navegador de **esta demo local**, ejecuta:

```js
const k='sanaesencia_web_v2_usuarios';const a=JSON.parse(localStorage.getItem(k)||'[]');a[0].rol='ADMIN';localStorage.setItem(k,JSON.stringify(a));location.reload();
```

Luego cierra sesión e ingresa con ese usuario para visitar `/administracion`. Este acceso y el esquema local **no son seguros para producción**.

## Pruebas (Jasmine + Karma)

```bash
npm test
```

Karma usa Chrome Headless instalado en el sistema. Los tests cubren validaciones, horarios, renderizado, filtros y cambio visual de estado de formulario. Ver `COBERTURA_TESTING.md`.

## Limitaciones importantes
Esta es una demostración **frontend sin backend**. Los datos permanecen solo en el navegador/dispositivo actual; no hay sincronización con Room Android ni entre usuarios, envío de correos, pago real ni seguridad de contraseñas. **No introducir datos personales ni contraseñas reales.** Para producción haría falta API, autenticación segura, reglas de disponibilidad en servidor y pasarela de pago.

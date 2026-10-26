# Cobertura y propuesta de testing — SanaEsencia V2

| Aspecto de la pauta | Caso implementado | Archivo |
|---|---|---|
| Lógica de formularios | Nombre no vacío, contraseña de 8+ con mayúscula y especial | `tests/validaciones.spec.js` |
| Lógica de reservas | Bloqueo de horario duplicado y disponibilidad alternativa | `tests/validaciones.spec.js` |
| Renderizado con datos | Presencia de especialidades provenientes de semillas | `tests/componentes.spec.jsx` |
| State y eventos | Filtrar por nombre; teclear contraseña y actualizar clase de validación | `tests/componentes.spec.jsx` |
| Datos y fechas | Generación de fecha local y horarios | `tests/validaciones.spec.js` |

Framework: **Jasmine** + **Karma**; motor: Chrome Headless; transpilación Babel/Webpack; React Testing Library para interacción. Ejecutar `npm test`. Las pruebas requieren navegador Chrome/Chromium disponible. No se declara porcentaje numérico al no haber instrumentalización de cobertura incorporada. Pruebas exploratorias pendientes: registro/login, reserva, confirmación de pago simulado aprobada/rechazada, cancelación, CRUD de admin y versión móvil. **No se han probado integraciones Android/web: son almacenamientos independientes.**

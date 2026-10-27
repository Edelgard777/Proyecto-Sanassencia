# Plan de pruebas y cobertura — SanaEsencia V2

## Herramientas

- Jasmine: especificaciones y aserciones.
- Karma + ChromeHeadless: ejecución en navegador.
- Webpack + Babel: transpilación de archivos `.js` y `.jsx`.
- babel-plugin-istanbul + karma-coverage: instrumentación y reportes de cobertura.
- React Testing Library: renderizado y eventos sobre componentes.

## Ejecutar

```powershell
npm.cmd install
npm.cmd test --coverage
```

En PowerShell con ejecución de scripts habilitada también se puede usar `npm install` y `npm test --coverage`. `npm test --coverage` también es compatible con la configuración del proyecto. Para ejecutar sin cobertura: `npm.cmd test`.

Se generan `coverage/html/index.html` y `coverage/lcov.info`. **La cobertura solo incluye código importado por las pruebas**, por lo que es posible tener porcentajes altos en lógica de validación sin que todas las pantallas hayan sido probadas. No se establece un porcentaje mínimo inventado.

## Casos automatizados

| Capa | Caso | Archivo |
|---|---|---|
| Validación | Nombre obligatorio | `tests/validaciones.spec.js` |
| Validación | Clave segura (8 caracteres, mayúscula y especial) | `tests/validaciones.spec.js` |
| Agenda | Impedir choque del profesional en el mismo horario | `tests/validaciones.spec.js` |
| Fechas | Fecha local y horarios disponibles | `tests/validaciones.spec.js` |
| CRUD | Crear, leer, actualizar y eliminar mensajes | `tests/validaciones.spec.js` |
| Datos | Rechazar colecciones inválidas | `tests/validaciones.spec.js` |
| Renderizado | Mostrar catálogo y especialidades | `tests/componentes.spec.jsx` |
| Eventos/state | Filtrar el catálogo | `tests/componentes.spec.jsx` |
| Formulario | Validar contraseña por cambios de estado | `tests/componentes.spec.jsx` |

## Pendientes de evidencia y pruebas exploratorias

1. Adjuntar captura del terminal con resultados de Jasmine/Karma.
2. Adjuntar capturas del resumen de `coverage/html/index.html`.
3. Probar manualmente login, reservas, cancelación, checkout simulado, panel admin y versión móvil.
4. Documentar defectos encontrados, medidas correctivas y fecha de ejecución.
5. Integración Android/web y backend real: **no implementados**.

**Importante:** Los test no han sido ejecutados y verificados en este entorno; se necesita una instalación de dependencias y Chrome disponible en el equipo donde se ejecuten.


## Corrección carga Karma (26-10-2026)
Se reemplazó el patrón de pruebas `tests/**/*.spec.{js,jsx}` (incompatible con el descubrimiento de archivos de Karma en esta configuración) por un único `tests/index.js` que importa los archivos `.spec.js` y `.spec.jsx`. Se declararon explícitamente los adaptadores `jasmine` y `webpack`.

Comandos PowerShell:
```powershell
npm.cmd install
npm.cmd run test:coverage
```
La salida HTML se genera en `coverage/html/index.html`. Alternativamente, `npm.cmd test -- --coverage` ejecuta las mismas pruebas con cobertura. `npm.cmd test --coverage` puede emitir una advertencia de npm 11+ porque falta el separador `--`.

**Importante:** una configuración lista para ejecutar no demuestra que las pruebas aprueben. Registrar resultados reales y porcentajes tras ejecutar localmente.


## Actualización de revisión (26-10-2026)

Se corrigió la transformación JSX en Karma mediante Babel con `runtime: automatic`, se añadieron pruebas de renderizado condicional, props/eventos, errores de inicio de sesión y casos límite de agenda. **Pendiente:** ejecutar de nuevo la suite y reemplazar cualquier resultado anterior por cifras verificadas del ZIP actual. En la ejecución anterior del usuario se observaron 9/12 pruebas aprobadas; esos porcentajes no representan el resultado de esta nueva versión.

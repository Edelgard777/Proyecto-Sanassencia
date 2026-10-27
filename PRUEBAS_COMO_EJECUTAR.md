# Ejecución y evidencia de pruebas — SanaEsencia

Desde la carpeta del proyecto, con Node.js instalado y Chrome disponible:

```powershell
npm.cmd install
npm.cmd test -- --coverage
```

Alternativa sin argumentos:

```powershell
npm.cmd run test:coverage
```

El resumen aparece en la terminal y el detalle HTML en `coverage/html/index.html`.

**Importante:** el proyecto contiene las pruebas, pero no deben darse por aprobadas hasta ejecutar los comandos en el equipo y conservar evidencia (captura con cantidad de pruebas, fallas y porcentajes). El entorno donde se preparó este ZIP no permitió instalar las dependencias, por lo que no se dispone de un resultado de ejecución verificado para esta revisión.

## Cobertura frente a la pauta

- Renderizado de especialidades: `tests/componentes.spec.jsx`
- Filtros y cambios de estado: `tests/componentes.spec.jsx`
- Validación de contraseña: `tests/componentes.spec.jsx`
- Renderizado condicional de mensajes de error y sin resultados: `tests/componentes.spec.jsx`
- Propiedades y callback de botón: `tests/componentes.spec.jsx` (botón aislado de prueba)
- Simulación de eventos de usuario: `tests/componentes.spec.jsx`
- CRUD, claves, agenda, fechas y casos límite: `tests/validaciones.spec.js`

## Advertencias de alcance

- El checkout es simulado y `localStorage` no es un backend.
- El ERS y el documento de cobertura deben ajustarse con los resultados y decisiones reales del equipo.
- El requisito de demostración frontend/backend debe confirmarse con el profesor.

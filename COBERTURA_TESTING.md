# Informe de pruebas y cobertura — SanaEsencia Web (Evaluación 2)

**Fecha de ejecución reportada:** 26 de octubre de 2026, 23:52 (hora local).  
**Origen de los resultados:** salida de consola de Windows proporcionada por el integrante del equipo.  
**Comando utilizado:** `npm.cmd test -- --coverage`.

## 1. Propósito y alcance

Verificar las reglas de negocio básicas de SanaEsencia y comportamientos de la interfaz React con Jasmine, Karma, ChromeHeadless y React Testing Library. El reporte de cobertura se produce con `babel-plugin-istanbul` y `karma-coverage`.

**Límite de la evidencia:** la ejecución fue realizada por el usuario en su computador; no se adjuntó todavía la captura del reporte HTML ni una ejecución independiente. Los porcentajes representan exclusivamente los módulos instrumentados e importados por la suite. No implican que toda la aplicación esté cubierta.

## 2. Resultado verificado por la consola

| Indicador | Resultado |
|---|---:|
| Compilación Webpack | Exitosa |
| Navegador | Chrome Headless 156.0.0.0 (Windows 10) |
| Pruebas ejecutadas | 20 |
| Pruebas aprobadas | 20 |
| Pruebas fallidas | 0 |
| Statements | **72,00 % (126/175)** |
| Branches | **70,78 % (126/178)** |
| Functions | **68,11 % (47/69)** |
| Lines | **91,89 % (34/37)** |

Registro textual de la ejecución: `Executed 20 of 20 SUCCESS` y `TOTAL: 20 SUCCESS`.

### Comparativa con ejecución previa

| Métrica | Versión anterior (18/18) | Actual (20/20) | Cambio |
|---|---:|---:|---:|
| Statements | 72,17 % | 72,00 % | −0,17 pp |
| Branches | 69,41 % | 70,78 % | +1,37 pp |
| Functions | 68,18 % | 68,11 % | −0,07 pp |
| Lines | 91,42 % | 91,89 % | +0,47 pp |

La ampliación de los archivos instrumentados modificó los denominadores. Pequeñas bajas no implican una regresión de funcionamiento.

## 3. Casos automatizados implementados

La suite contiene 20 pruebas según el código de `tests/validaciones.spec.js`, `tests/componentes.spec.jsx` y `tests/administracion.spec.jsx`:

| Código | Comportamiento cubierto | Archivo |
|---|---|---|
| T01 | Nombre obligatorio / nombre con contenido | validaciones.spec.js |
| T02 | Contraseña: longitud, mayúscula y carácter especial | validaciones.spec.js |
| T03 | Rechazo de horario duplicado del profesional | validaciones.spec.js |
| T04 | Lista de horarios definida | validaciones.spec.js |
| T05 | Generación de fecha local | validaciones.spec.js |
| T06 | Crear y leer mensajes con persistencia local | validaciones.spec.js |
| T07 | Actualizar registro | validaciones.spec.js |
| T08 | Eliminar registro | validaciones.spec.js |
| T09 | Rechazar colección de datos inválida | validaciones.spec.js |
| T10 | Permitir nueva reserva si la anterior está cancelada | validaciones.spec.js |
| T11 | Exclusión de la misma cita al modificar horario | validaciones.spec.js |
| T12 | Mantener ID original al actualizar | validaciones.spec.js |
| T13 | Renderizar especialidades | componentes.spec.jsx |
| T14 | Buscar y filtrar especialidades | componentes.spec.jsx |
| T15 | Cambios visuales al validar una contraseña | componentes.spec.jsx |
| T16 | Mostrar/ocultar mensaje condicional de búsqueda sin resultados | componentes.spec.jsx |
| T17 | Props de etiqueta y callback en botón **definido dentro del test** | componentes.spec.jsx |
| T18 | Mostrar error de inicio de sesión ante credenciales inválidas | componentes.spec.jsx |
| T19 | Crear especialidad desde administración y comprobar tabla actualizada | administracion.spec.jsx |
| T20 | Crear profesional vinculado a especialidad y comprobar tabla actualizada | administracion.spec.jsx |

**Limitación de T17:** demuestra uso de props y `onClick` en React, pero no prueba un componente reutilizable real del proyecto. Se recomienda extraer un `Boton` de producción o realizar la prueba sobre un botón existente.

## 4. Relación con los criterios docentes (página 11)

| Criterio | Evidencia | Estado |
|---|---|---|
| Renderizado de listas | T13 | Evidenciado parcialmente (verifica elementos representativos, no cuenta los siete) |
| Renderizado condicional | T16, T18 | Evidenciado |
| Props y callback | T17 | Parcial: componente de prueba, no componente del producto |
| State, entrada de texto | T14, T15 | Evidenciado |
| Eventos, clic | T17, T18 | Evidenciado |
| CRUD y lógica | T06–T12 y T19–T20 | Evidenciado (altas administrativas automáticas) |

## 5. Pruebas manuales pendientes de registrar

| ID | Flujo | Procedimiento sugerido | Resultado esperado | Evidencia |
|---|---|---|---|---|
| M01 | Registro | Registrar usuario con nombre vacío y contraseña inválida y luego válida | Impide datos inválidos y permite válidos | Pendiente |
| M02 | Acceso | Ingresar y cerrar sesión | Cambia sesión y navegación | Pendiente |
| M03 | Reserva | Reservar profesional/fecha/hora libre | Genera cita visible en Mis Citas | Pendiente |
| M04 | Colisión | Intentar misma fecha/hora/profesional | Rechaza duplicado | Pendiente |
| M05 | Cancelar cita | Cancelar una cita existente | Actualiza estado | Pendiente |
| M06 | Checkout | Simular pago exitoso y rechazado | Muestra ambas pantallas de resultado | Pendiente |
| M07 | Administrador | Crear, editar y eliminar servicio y profesional | Catálogo y listas cambian sin recargar | Pendiente (T19–T20 cubren creación automática, no todos los flujos manuales) |
| M08 | Responsive | Probar 375px, 768px y 1366px | Sin desbordes ni controles inaccesibles | Pendiente |
| M09 | Persistencia | Recargar página y recuperar cita | Datos se conservan en navegador | Pendiente |

## 6. Evidencias para el informe final

- Captura de consola con `TOTAL: 20 SUCCESS` y resumen de cobertura.
- Captura de `coverage/html/index.html` y detalle de archivos cubiertos.
- Capturas de los flujos manuales M01–M09 con fecha, evaluador y observaciones.
- Enlace al commit de GitHub donde constan los archivos de pruebas y la configuración de Karma.

## 7. Análisis de calidad y acciones siguientes

Las 20 pruebas de la suite pasan; no hay defectos abiertos **dentro de esos casos concretos**. Los resultados no certifican integridad de sesión, flujo administrativo completo, pasarela real ni sincronización multiusuario. La cobertura de ramas (69,41 %) y de funciones (68,18 %) revela oportunidades de ampliar casos límite. Se recomienda probar primero permisos administrativos, reserva/cancelación y errores de pago. No se fija un umbral artificial: la pauta no establece mínimo porcentual.

## 8. Reproducción

```powershell
npm.cmd install
npm.cmd test -- --coverage
```

Abrir `coverage/html/index.html` para el informe HTML. Opcional: `npm.cmd run test:coverage`, si la entrada está definida en `package.json`.

## 9. Resultado más reciente aportado por el equipo

La ejecución local comunicada el 26-10-2026 a las 23:52 informó `webpack ... compiled successfully`, `Executed 20 of 20 SUCCESS` y `TOTAL: 20 SUCCESS`. No se ha adjuntado todavía una imagen del informe HTML ni evidencia de las pruebas manuales. **No se declara ejecución independiente en este entorno.**

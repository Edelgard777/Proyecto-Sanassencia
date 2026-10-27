# Bitácora de pruebas manuales — SanaEsencia Web

**Estado:** plantilla pendiente de ejecución. No rellenar «Aprobado» sin haber comprobado el flujo.
**Versión:** Evaluación 2, suite automatizada con 20/20 pruebas aprobadas según consola local.

| ID | Escenario | Pasos resumidos | Resultado esperado | Resultado real | Estado | Captura / archivo |
|---|---|---|---|---|---|---|
| M01 | Registro | Probar nombre vacío y contraseña inválida; luego válidos | Muestra validaciones y permite registro válido | Pendiente | No ejecutada | Pendiente |
| M02 | Inicio/cierre de sesión | Ingresar, salir, intentar ruta privada | Cambia sesión y restringe vista | Pendiente | No ejecutada | Pendiente |
| M03 | Reserva | Elegir profesional, fecha, hora libre | Cita aparece en Mis Citas | Pendiente | No ejecutada | Pendiente |
| M04 | Colisión de horario | Repetir mismo profesional, fecha y hora | No permite duplicado | Pendiente | No ejecutada | Pendiente |
| M05 | Cancelación | Cancelar una reserva | Estado actualizado | Pendiente | No ejecutada | Pendiente |
| M06 | Simulación de pago | Probar resultado exitoso y rechazado | Comprobantes correspondientes | Pendiente | No ejecutada | Pendiente |
| M07 | Administración CRUD | Crear, editar y eliminar especialidad/profesional | Tabla y catálogo sincronizados | Pendiente | No ejecutada | Pendiente |
| M08 | Responsive | Ancho 375, 768 y 1366 px | Sin desbordes ni solapamientos | Pendiente | No ejecutada | Pendiente |
| M09 | Persistencia | Crear cita y recargar en el mismo navegador | Datos conservados | Pendiente | No ejecutada | Pendiente |

## Evidencia automatizada registrada
- **Comando:** `npm.cmd test -- --coverage`
- **Resultado comunicado:** `Executed 20 of 20 SUCCESS`; `TOTAL: 20 SUCCESS`
- **Statements:** 72,00 % (126/175)
- **Branches:** 70,78 % (126/178)
- **Functions:** 68,11 % (47/69)
- **Lines:** 91,89 % (34/37)

Para evidencias: captura de terminal, reporte `coverage/html/index.html`, y capturas de cada caso manual con fecha y observaciones.

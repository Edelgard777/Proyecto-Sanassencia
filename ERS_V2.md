# Especificación de Requisitos de Software (ERS) V2 — SanaEsencia

**Alcance:** prototipo académico de interfaz web React/Vite adaptable a móviles; los datos se simulan localmente. **Fuente:** app Android adjunta y pauta de Evaluación 2.

## Actores
- Visitante: examina catálogo, profesionales, promociones y contacto; puede reservar como invitado.
- Paciente registrado: inicia sesión, reserva, ve historial, cancela citas y edita nombre.
- Administrador: gestiona servicios y profesionales; ve usuarios, reservas y estadísticas.

## Requisitos funcionales
- RF01 Navegar por inicio, categorías, especialidades, profesionales y contacto.
- RF02 Buscar y filtrar servicios por texto y modalidad.
- RF03 Registrarse e iniciar/cerrar sesión con validación de nombre y contraseña (8+, mayúscula, especial).
- RF04 Registrar citas con paciente, email, especialidad, profesional, fecha, hora y modalidad.
- RF05 Rechazar fechas pasadas y horarios ocupados por el mismo profesional.
- RF06 Simular checkout, éxito/rechazo y comprobante.
- RF07 Consultar y cancelar reservas del usuario activo.
- RF08 Crear/editar/eliminar especialidades y profesionales desde área admin local.
- RF09 Editar usuarios existentes en administración y consultar conteos/estados de citas.
- RF10 Guardar contacto y datos mediante `localStorage`.

## Requisitos no funcionales
- RNF01 Componentes React y estado reutilizable a través de contexto.
- RNF02 Adaptación responsive con Bootstrap y CSS propio.
- RNF03 Persistencia CRUD local; no implica base remota.
- RNF04 Pruebas unitarias con Jasmine/Karma y pruebas de interfaz con React Testing Library.
- RNF05 Navegación por React Router sin recargas completas.

## Restricciones / riesgos
Sin backend ni pasarela real, no hay sincronización con Android, autenticación confiable, validación concurrente multiusuario ni comunicaciones externas. Almacenar claves en texto plano solo como demostración local **no debe usarse en producción**. Las ofertas se muestran cuando el administrador o desarrollador marca `oferta: true` en un servicio. El precio no se extrae de Android; queda en 0 hasta que se configure manualmente.

## Criterios de aceptación
1. Registrar un paciente con contraseña válida y ver cambios de borde de rojo a verde.
2. Elegir profesional y hora, confirmar simulación y ver comprobante e historial.
3. Repetir fecha/hora de profesional y verificar indisponibilidad.
4. Administrador añade, edita y elimina un servicio; catálogo se actualiza sin recarga.
5. Ejecutar `npm test`, corregir fallos y documentar evidencias con capturas para defensa.


## Matriz de trazabilidad para Evaluación 2

| Pauta | Implementación | Comprobación / pendiente |
|---|---|---|
| React y componentes | `src/pages`, `src/components`, `src/context` | Verificar organización por responsabilidad |
| Datos simulados + CRUD | `src/data/semillas.js`, `src/data/almacen.js` | T06–T12 |
| Persistencia | `localStorage`, contexto React | M09 y comprobación de actualización |
| Bootstrap responsive | CSS + Bootstrap | M08 pendiente |
| Vistas adicionales | Catálogo, reserva, checkout, resultados y administración | M03, M06, M07 pendientes |
| Búsqueda / formularios | Catálogo y Acceso | T14–T16, T18 |
| Jasmine + Karma | `karma.conf.cjs`, `tests/` | 20/20 aprobadas según consola del usuario |
| Renderizado, props, estado, eventos | `tests/componentes.spec.jsx` | Props sobre componente real todavía mejorable |
| Presentación backend/frontend | No existe integración backend real | Acordar con docente alcance o implementarla |

## Equivalencia del negocio respecto del ejemplo de tienda

El documento docente usa *productos, carrito, compra y envío* como caso guía. SanaEsencia, un servicio de atención, adapta estos conceptos a *especialidades, agenda/reserva, checkout simulado y comprobante*. No existe envío físico. La aceptación docente de esta equivalencia debe confirmarse expresamente; tampoco existe blog identificado en la versión revisada.

## Estado de verificación (26-10-2026)

Se reportó ejecución exitosa de 20 de 20 tests, incluidas dos pruebas de creación administrativa de especialidades y profesionales. Las verificaciones manuales de interfaz, responsive, administración y checkout aún necesitan evidencias. El backend no está conectado; `localStorage` es una simulación académica, no una base de datos compartida con Android. Las credenciales guardadas localmente carecen de seguridad adecuada para producción.

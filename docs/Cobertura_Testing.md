# Cobertura y pruebas

## Herramientas y ejecución

- Jasmine con Karma y ChromeHeadless.
- `karma-webpack`, Babel y `@babel/preset-react` para transformar JSX.
- `babel-plugin-istanbul` y `karma-coverage` para instrumentación e informes HTML, consola y JSON.
- React `act` y `react-dom/client` para montar componentes sin añadir dependencias de testing adicionales.
- Ejecutar `npm install` y `npm test`. El informe HTML queda en `coverage/html/` y el resumen por archivo en `coverage/coverage-summary.json`.
- `npm run test:watch` mantiene Karma ejecutándose para desarrollo.

## Matriz completa de pruebas

| # | Prueba | Qué verifica | Archivo/s bajo prueba |
|---:|---|---|---|
| 1 | Navbar muestra todos los enlaces | Rutas principales y administración visibles. | `Navbar` |
| 2 | Navbar alterna menú móvil | Estado expandido, clase visible y cierre del menú. | `Navbar` |
| 3 | Navbar cierra al elegir una ruta | Seleccionar Contacto cierra el menú. | `Navbar` |
| 4 | Profesionales muestra semilla | Renderiza los tres profesionales iniciales. | `Profesionales`, `db` |
| 5 | Búsqueda de profesionales | Filtra al escribir un nombre. | `Profesionales`, `SearchBox` |
| 6 | Lista sin coincidencias | Estado vacío solo con cero resultados. | `Profesionales`, `EmptyState` |
| 7 | Filtro por área | Muestra solo profesionales de la especialidad elegida. | `Profesionales` |
| 8 | Filtro por modalidad | `Online` incluye perfiles online y modalidad compuesta. | `Profesionales` |
| 9 | Error al leer profesionales | Muestra el error de almacenamiento inválido. | `Profesionales`, `useColeccion` |
| 10 | ProfesionalCard muestra props | Nombre y área personalizados. | `ProfesionalCard` |
| 11 | ProfesionalCard compacto y defaults | Variante compacta y valores predeterminados. | `ProfesionalCard` |
| 12 | Button llama onClick | Etiqueta configurable y callback invocado una vez. | `Button` |
| 13 | Button acepta atributos | Children, variante, disabled y aria-label. | `Button` |
| 14 | Button sin callback | El callback predeterminado no interrumpe la interacción. | `Button` |
| 15 | EmptyState personalizado | Título y mensaje recibidos por props. | `EmptyState` |
| 16 | EmptyState predeterminado | Valores de título y mensaje por defecto. | `EmptyState` |
| 17 | Agenda rechaza datos inválidos | Errores por campo y servicio no invocado. | `Agenda`, `validaciones`, `db` |
| 18 | Agenda confirma una cita válida | Persiste la cita, muestra resumen y completa confirmación. | `Agenda`, `ReservaResultado`, `db` |
| 19 | Agenda edita cita existente | Actualiza por ID en vez de crear un duplicado. | `Agenda`, `db` |
| 20 | Agenda informa fallo de guardado | Navega al estado de error si falla crear. | `Agenda`, `db` |
| 21 | Contacto rechaza datos inválidos | Errores de campo y ningún mensaje persistido. | `Contacto`, `validaciones` |
| 22 | Contacto envía mensaje válido | Persiste el mensaje y muestra confirmación. | `Contacto`, `db` |
| 23 | Contacto presenta fallo del servicio | El error del guardado se comunica en pantalla. | `Contacto`, `db` |
| 24 | Admin cambia estado y elimina cita | Actualiza estado y elimina la cita del CRUD. | `Admin`, `db` |
| 25 | Admin crea profesional | Crea un registro con nombre y área. | `Admin`, `db` |
| 26 | Admin edita profesional | Actualiza registro conservando el ID. | `Admin`, `db` |
| 27 | Admin valida y elimina profesional | Campos obligatorios y operación de eliminación. | `Admin`, `db` |
| 28 | Admin elimina mensaje | Lista el mensaje y permite borrarlo. | `Admin`, `db` |
| 29 | Admin cancela edición | Vuelve del formulario de edición al formulario de creación. | `Admin` |
| 30 | Admin muestra error CRUD | Expone el error al fallar la creación de un profesional. | `Admin`, `useColeccion` |
| 31 | Admin cierra sesión | Limpia la sesión administrativa guardada. | `Admin`, `AuthContext` |
| 32 | Detalle de profesional existente | Nombre, área y modalidad del perfil encontrado. | `ProfesionalDetalle`, `useColeccion` |
| 33 | Detalle inexistente | Estado vacío y enlace para volver al equipo. | `ProfesionalDetalle`, `EmptyState` |
| 34 | Detalle informa error de lectura | Error explícito al cargar el profesional. | `ProfesionalDetalle`, `useColeccion` |
| 35 | Confirmación resume la cita | Muestra información y acceso para editar. | `ConfirmacionAgenda` |
| 36 | Éxito usa sessionStorage | Recupera datos guardados y muestra confirmación. | `AgendaExito`, `FormSuccess` |
| 37 | Éxito sin cita redirige | Retorna a la agenda si no hay datos. | `AgendaExito` |
| 38 | Error de reserva muestra resumen | Presenta los datos y la explicación del error. | `AgendaError` |
| 39 | Error de reserva sin resumen redirige | Evita renderizar un error sin contexto. | `AgendaError` |
| 40 | CRUD completo | Crear, leer, consultar por ID, actualizar y eliminar. | `db` |
| 41 | Colección inicialmente vacía | Guarda y devuelve una colección semilla vacía. | `db`, `localStorage` |
| 42 | Actualizar ID inexistente | Lanza el error esperado y explícito. | `db` |
| 43 | JSON almacenado inválido | El parseo inválido se propaga como error. | `db` |
| 44 | JSON con tipo incorrecto | Rechaza un objeto que no sea una colección. | `db` |
| 45 | Colección desconocida e ID duplicado | Rechaza colección y clave duplicada; borrar ID ausente devuelve false. | `db` |
| 46 | Hook refleja cambios CRUD | Actualiza la vista y procesa eventos de su colección. | `useColeccion`, `db` |
| 47 | Hook escucha eventos de otras pestañas | Recarga para la clave correcta y para limpieza global. | `useColeccion` |
| 48 | Hook recupera errores | Captura error inicial y de operación, luego recarga. | `useColeccion`, `db` |
| 49 | Validar cita correcta | Acepta datos y fecha futura válidos. | `validarCita` |
| 50 | Validar cita inválida | Informa errores de nombre, correo, teléfono, especialidad y fecha. | `validarCita` |
| 51 | Validar fecha pasada | Rechaza una fecha anterior al día actual. | `validarCita` |
| 52 | Validar mensaje correcto | Acepta nombre, correo y contenido válidos. | `validarMensaje` |
| 53 | Validar mensaje inválido | Rechaza nombre, correo y mensaje cortos o inválidos. | `validarMensaje` |
| 54 | Login con credenciales incorrectas | Mantiene el login e informa el rechazo. | `AdminLogin`, `AuthContext` |
| 55 | Login con credenciales correctas | Guarda usuario admin y navega al panel. | `AdminLogin`, `AuthContext` |
| 56 | Login con sesión activa | Redirige al panel sin volver a pedir credenciales. | `AdminLogin`, `AuthContext` |
| 57 | Ruta 404 | Muestra página no encontrada y ejecuta scroll-to-top. | `App`, `ScrollToTop` |
| 58 | Ruta admin protegida | Sin sesión, redirige al login y no renderiza el panel. | `App`, `ProtectedRoute` |
| 59 | Inicio y especialidades | Renderiza ambas vistas principales en sus rutas. | `App`, `Inicio`, `Especialidades` |
| 60 | Carrusel navega entre slides | Controles anterior/siguiente y aria-hidden. | `Carrusel` |
| 61 | Carrusel indicador seleccionable | El indicador cambia la diapositiva activa. | `Carrusel` |
| 62 | Carrusel sin slides | No renderiza contenido cuando recibe una lista vacía. | `Carrusel` |
| 63 | Carrusel de un slide | No muestra controles para una sola diapositiva. | `Carrusel` |
| 64 | Filtro por categoría | Lista solo las especialidades de la categoría elegida. | `Especialidades` |
| 65 | Búsqueda y estado vacío de especialidades | Filtra por texto y muestra el estado vacío al no coincidir. | `Especialidades`, `SearchBox`, `EmptyState` |
| 66 | Información expandible | Alterna el detalle adicional de una especialidad. | `Especialidades` |
| 67 | Error al leer especialidades | Presenta el fallo del servicio en la vista. | `Especialidades`, `useColeccion` |
| 68 | EspecialidadCard con datos | Contenido y enlace asociados al ID recibido. | `EspecialidadCard` |
| 69 | EspecialidadCard predeterminada | Fallbacks para datos ausentes y enlace general. | `EspecialidadCard` |
| 70 | SearchBox predeterminado | Label, nombre y placeholder por defecto. | `SearchBox` |
| 71 | SearchBox configurable | Propaga cambios y aplica label, nombre y clase recibidos. | `SearchBox` |

Las **13 pruebas originales** permanecen cubiertas: navegación y menú, listado/búsqueda/estado vacío de profesionales, props del profesional y botón, agenda inválida y válida, CRUD, redirección protegida, 404 y estado vacío. Se distribuyeron en suites específicas y se sumaron 58 casos.

## Mocks, spies y aislamiento

- `jasmine.createSpy` comprueba callbacks proporcionados por props.
- `spyOn` verifica operaciones CRUD, escrituras y lecturas de `localStorage`, además de fallos simulados del servicio.
- `window.scrollTo` se sustituye por un spy en las pruebas de rutas.
- Cada suite limpia `localStorage` y `sessionStorage`; las raíces React se desmontan tras cada prueba.
- Formularios se ejercitan con eventos DOM controlados y `act`; las validaciones se prueban también como funciones puras.

## Resultado medido

**Comando:** `npm test`  
**Entorno:** Karma, Jasmine y ChromeHeadless 155.0.0.0; ejecución del 19-10-2026.  
**Resultado:** **71 pruebas aprobadas, 0 fallidas**.  
**Cobertura global real:** statements **94.95%** (395/416), branches **88.46%** (253/286), functions **90.32%** (140/155) y lines **96.43%** (352/365).

### Cobertura real por archivo

| Archivo | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `src/App.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Button.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Carrusel.jsx` | 83.33% | 100% | 71.42% | 84.21% |
| `src/components/EmptyState.jsx` | 100% | 100% | 100% | 100% |
| `src/components/EspecialidadCard.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Footer.jsx` | 100% | 100% | 100% | 100% |
| `src/components/FormField.jsx` | 100% | 90.90% | 66.66% | 100% |
| `src/components/FormSuccess.jsx` | 100% | 50% | 100% | 100% |
| `src/components/Icon.jsx` | 100% | 75% | 100% | 100% |
| `src/components/Navbar.jsx` | 87.50% | 100% | 83.33% | 85.71% |
| `src/components/ProfesionalCard.jsx` | 100% | 100% | 100% | 100% |
| `src/components/SearchBox.jsx` | 100% | 100% | 50% | 100% |
| `src/contexts/AuthContext.jsx` | 95.23% | 80% | 100% | 95% |
| `src/contexts/authContextCore.js` | 100% | 100% | 100% | 100% |
| `src/data/constantes.js` | 100% | 100% | 100% | 100% |
| `src/data/datos.jsx` | 100% | 100% | 100% | 100% |
| `src/hooks/useAuth.js` | 75% | 50% | 100% | 75% |
| `src/hooks/useColeccion.js` | 100% | 70% | 100% | 100% |
| `src/pages/Admin.jsx` | 82.75% | 86.66% | 71.42% | 90% |
| `src/pages/AdminLogin.jsx` | 100% | 100% | 100% | 100% |
| `src/pages/Agenda.jsx` | 100% | 92.85% | 100% | 100% |
| `src/pages/Contacto.jsx` | 100% | 81.81% | 100% | 100% |
| `src/pages/Especialidades.jsx` | 100% | 90.47% | 100% | 100% |
| `src/pages/Inicio.jsx` | 100% | 44.44% | 100% | 100% |
| `src/pages/ProfesionalDetalle.jsx` | 90.90% | 75% | 100% | 90% |
| `src/pages/Profesionales.jsx` | 100% | 90% | 100% | 100% |
| `src/pages/ReservaResultado.jsx` | 92% | 90% | 100% | 100% |
| `src/services/db.js` | 98.07% | 91.30% | 100% | 97.82% |
| `src/utils/validaciones.js` | 100% | 100% | 100% | 100% |

### Qué queda por cubrir

- `Inicio.jsx` conserva branches para errores de las colecciones y combinaciones de contenido vacío; las pruebas principales recorren la ruta con semillas válidas. Los statements y funciones están cubiertos, pero esos caminos alternativos explican el 44.44% de branches.
- `Carrusel.jsx` se prueba en navegación, lista vacía y un único slide; el avance real por temporizador y los efectos de pausa/reanudación por puntero no esperan seis segundos en esta suite, de ahí la cobertura parcial de funciones y líneas.
- `useAuth.js` mantiene sin ejecutar el guard que lanza si se usa fuera de `AuthProvider`: dispararía un error de render intencional en vez de representar un flujo de usuario válido. Los flujos de login, sesión, protección y logout sí están cubiertos.
- `FormSuccess.jsx`, `FormField.jsx` y `Icon.jsx` tienen branches de contenido opcional, valores alternativos o iconos desconocidos; se ejercitan las formas usadas por las vistas, no todas las combinaciones puramente decorativas.
- `Admin.jsx` cubre las acciones centrales (crear/editar/eliminar, cambio de estado, errores y logout), pero siguen sin recorrerse todas las combinaciones de colecciones vacías/error de lectura y formularios de edición parcial.
- `db.js` conserva el guard para entornos sin `window.localStorage`, una condición de navegador no disponible en ChromeHeadless normal. JSON inválido, formato incorrecto, colección desconocida, ID ausente y duplicados sí tienen pruebas.

Los archivos completos de cobertura se regeneran en `coverage/` en cada ejecución; la tabla anterior refleja el `coverage-summary.json` producido por la ejecución indicada, no estimaciones.

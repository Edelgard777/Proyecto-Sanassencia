# Especificación de Requisitos del Software (ERS) — SanaEsencia

**Versión:** 2.0  
**Tipo de sistema:** Aplicación web responsive para un centro de bienestar

## 1. Introducción

Este documento especifica los requisitos funcionales y no funcionales de SanaEsencia, una aplicación de información y reserva de horas para un centro integrativo de bienestar. La versión 2 incorpora persistencia local simulada, búsqueda y filtros, perfiles de profesionales, flujo de reserva y un panel administrativo.

## 2. Alcance

La aplicación permite consultar especialidades y profesionales, enviar solicitudes de atención y mensajes, y administrar esos registros en una sesión protegida. Los datos se guardan en `localStorage` del navegador; no se transmiten a un backend ni constituyen una reserva confirmada por un prestador real. La autenticación del panel es demostrativa y no debe utilizarse como control de acceso de producción.

## 3. Requisitos funcionales

| ID | Requisito |
|---|---|
| RF-01 | Mostrar la página de inicio con carrusel de imágenes, navegación y accesos a las áreas del sitio. |
| RF-02 | Presentar especialidades consultables por texto y filtrables por categoría. |
| RF-03 | Presentar profesionales con búsqueda por texto y filtros por área y modalidad. |
| RF-04 | Mostrar una vista de detalle para cada profesional mediante `/profesionales/:id`. |
| RF-05 | Validar en React los campos requeridos de una solicitud de hora y exponer errores por campo. |
| RF-06 | Guardar citas y mensajes localmente y propagar las actualizaciones a las vistas abiertas. |
| RF-07 | Guiar la solicitud de reserva por `/agenda`, `/agenda/confirmacion` y las vistas `/agenda/exito` o `/agenda/error`. |
| RF-08 | Permitir el acceso simulado al panel `/admin` y redirigir a `/admin/login` si no existe sesión administrativa. |
| RF-09 | Permitir consultar, cambiar estado y eliminar citas; consultar y eliminar mensajes. |
| RF-10 | Permitir crear, editar y eliminar profesionales desde administración. |
| RF-11 | Autocompletar nombre y correo de la sesión en el formulario de agenda cuando están disponibles. |
| RF-12 | Conservar la navegación global, desplazamiento al inicio de página y vista 404 para rutas inexistentes. |

## 4. Requisitos no funcionales

- **RNF-01 Responsive:** contenido organizado con Bootstrap 5 para móvil, tableta y escritorio.
- **RNF-02 Accesibilidad:** controles con etiquetas, navegación semántica, estados y mensajes legibles por tecnologías de asistencia.
- **RNF-03 Mantenibilidad:** componentes de presentación pequeños, props explícitas y estado de interacción en los componentes responsables.
- **RNF-04 Persistencia:** CRUD desacoplado mediante un servicio y colecciones locales versionables por clave.
- **RNF-05 Compatibilidad:** implementación JavaScript/JSX para React 19 y Vite.
- **RNF-06 Privacidad:** indicar que la persistencia es local y demostrativa; no almacenar información real sensible.
- **RNF-07 Calidad:** pruebas unitarias Jasmine ejecutadas en ChromeHeadless mediante Karma, con reporte HTML y resumen textual de cobertura.

## 5. Historias de usuario

1. Como visitante, quiero conocer las especialidades y filtrar por categoría para encontrar la atención que necesito.
2. Como paciente, quiero buscar profesionales por nombre, área o modalidad y consultar su perfil.
3. Como paciente, quiero solicitar una hora, revisar los datos y recibir una confirmación visible.
4. Como visitante, quiero enviar un mensaje y recibir una indicación de que quedó guardado.
5. Como administrador, quiero iniciar sesión en el panel y gestionar citas, mensajes y profesionales.
6. Como usuario móvil, quiero una navegación colapsable y formularios cómodos en una pantalla pequeña.

## 6. Vistas y flujo de navegación

- **Inicio (`/`):** carrusel, especialidades destacadas, profesionales y llamados a la acción.
- **Especialidades (`/especialidades`):** buscador y selector de categoría.
- **Profesionales (`/profesionales`):** buscador, filtros por área/modalidad y enlaces de detalle.
- **Detalle (`/profesionales/:id`):** perfil, modalidad y acceso a agenda.
- **Agenda (`/agenda`):** formulario controlado y validado localmente.
- **Confirmación (`/agenda/confirmacion`):** resumen editable antes de terminar.
- **Resultado (`/agenda/exito`, `/agenda/error`):** confirmación o error con resumen de solicitud disponible.
- **Contacto (`/contacto`):** formulario de mensajes y confirmación de persistencia local.
- **Acceso (`/admin/login`) y administración (`/admin`):** sesión simulada, administración de citas, mensajes y profesionales.
- **404:** ruta de retorno al inicio para cualquier URL inexistente.

## 7. Tecnologías

- React 19, JavaScript y JSX
- Vite
- React Router
- Bootstrap 5
- `localStorage` y `sessionStorage` para persistencia simulada
- Jasmine y Karma con ChromeHeadless y `karma-coverage`

## 8. Propuesta personalizada

SanaEsencia prioriza un tono cercano y una paleta inspirada en bosque, salvia y crema. La propuesta integra orientación de bienestar con agenda y perfiles profesionales, sin simular disponibilidad real ni transmisión de datos. Para producción se recomienda incorporar API/backend, autenticación robusta, política de privacidad, autorización por roles y validación del lado servidor.

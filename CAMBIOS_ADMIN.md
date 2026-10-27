# Corrección de CRUD administrativo

Se corrigió la decisión entre **crear** y **actualizar** en la página de administración: el formulario usa `{nuevo:true}` al agregar, pero antes se intentaba actualizar un ID inexistente. Ahora se ejecuta `crear()` cuando se añade un registro y `actualizar()` únicamente al editar uno existente.

También se agregaron dos pruebas Jasmine de integración para verificar la creación de especialidades y profesionales, la persistencia en localStorage y la actualización inmediata de la tabla mediante el contexto React.

## Verificación

```powershell
npm.cmd install
npm.cmd test -- --coverage
npm.cmd run dev
```

**Nota:** Los registros son locales a cada navegador; no existe un backend compartido. No se han ejecutado estas pruebas en este entorno; deben comprobarse con los comandos indicados.

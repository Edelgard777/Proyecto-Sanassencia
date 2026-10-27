import {validarClave,validarNombre,disponible,fechaLocal,horas,leer,crear,actualizar,eliminar} from '../src/data/almacen.js';
describe('Validaciones SanaEsencia',()=>{it('requiere nombre no vacío',()=>{expect(validarNombre('')).toBeFalse();expect(validarNombre('  Ana  ')).toBeTrue()});it('requiere 8 caracteres, mayúscula y especial',()=>{expect(validarClave('abc')).toBeFalse();expect(validarClave('abcdefgh!')).toBeFalse();expect(validarClave('Abcdefgh')).toBeFalse();expect(validarClave('Abcdefg!')).toBeTrue()});it('no permite citas duplicadas en el mismo horario',()=>{const citas=[{id:'1',profesionalId:4,fecha:'2026-11-20',hora:'10:00',estado:'Confirmada'}];expect(disponible(citas,4,'2026-11-20','10:00')).toBeFalse();expect(disponible(citas,4,'2026-11-20','11:00')).toBeTrue()});it('publica horarios disponibles',()=>expect(horas.length).toBeGreaterThan(0));it('construye fecha local',()=>expect(fechaLocal(new Date(2026,9,25))).toBe('2026-10-25'))});

describe('Persistencia CRUD local',()=>{
  beforeEach(()=>localStorage.clear());
  afterEach(()=>localStorage.clear());
  it('crea y lee un mensaje',()=>{
    const mensaje=crear('mensajes',{nombre:'Prueba',texto:'Hola'});
    expect(mensaje.id).toBeDefined();
    expect(leer('mensajes').find(x=>x.id===mensaje.id).texto).toBe('Hola');
  });
  it('actualiza un registro existente',()=>{
    const mensaje=crear('mensajes',{nombre:'Antes'});
    actualizar('mensajes',mensaje.id,{nombre:'Después'});
    expect(leer('mensajes')[0].nombre).toBe('Después');
  });
  it('elimina un registro',()=>{
    const mensaje=crear('mensajes',{nombre:'Eliminar'});
    eliminar('mensajes',mensaje.id);
    expect(leer('mensajes').length).toBe(0);
  });
  it('rechaza colecciones desconocidas',()=>{
    expect(()=>leer('no-existe')).toThrowError('Colección inválida');
  });
});

describe('Casos límite de la agenda',()=>{
  it('un horario vuelve a estar disponible si la cita está cancelada',()=>{
    const citas=[{id:'cancelada',profesionalId:4,fecha:'2026-11-20',hora:'10:00',estado:'Cancelada'}];
    expect(disponible(citas,4,'2026-11-20','10:00')).toBeTrue();
  });
  it('permite modificar una cita excluyéndola del control de duplicados',()=>{
    const citas=[{id:'cita1',profesionalId:4,fecha:'2026-11-20',hora:'10:00',estado:'Confirmada'}];
    expect(disponible(citas,4,'2026-11-20','10:00','cita1')).toBeTrue();
  });
  it('mantiene el identificador original al actualizar',()=>{
    localStorage.clear();
    const creado=crear('mensajes',{nombre:'Antes'});
    const editado=actualizar('mensajes',creado.id,{id:'reemplazo',nombre:'Después'});
    expect(editado.id).toBe(creado.id);
    expect(editado.nombre).toBe('Después');
    localStorage.clear();
  });
});

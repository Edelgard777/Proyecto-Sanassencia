import React from 'react';import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';import {SanaProvider} from '../src/context/SanaContext';import Acceso from '../src/pages/Acceso';import Catalogo from '../src/pages/Catalogo';
describe('Componentes React',()=>{afterEach(()=>{cleanup();localStorage.clear();sessionStorage.clear()});it('renderiza las siete especialidades',()=>{render(<MemoryRouter><SanaProvider><Catalogo/></SanaProvider></MemoryRouter>);expect(screen.getByText('Acupuntura')).toBeTruthy();expect(screen.getByText('Nutrición Integrativa')).toBeTruthy()});it('filtra resultados al escribir',()=>{render(<MemoryRouter><SanaProvider><Catalogo/></SanaProvider></MemoryRouter>);fireEvent.change(screen.getByPlaceholderText('Psicología, nutrición…'),{target:{value:'Quiropraxia'}});expect(screen.getByText('Quiropraxia')).toBeTruthy();expect(screen.queryByText('Acupuntura')).toBeNull()});it('muestra validación al escribir contraseña insuficiente',()=>{render(<MemoryRouter><SanaProvider><Acceso registro/></SanaProvider></MemoryRouter>);const field=screen.getByLabelText('Contraseña');fireEvent.change(field,{target:{value:'abc'}});expect(field.className).toContain('invalid');fireEvent.change(field,{target:{value:'Abcdefgh!'}});expect(field.className).toContain('valid')})});

describe('Interacción y propiedades de componentes', () => {
  afterEach(() => { cleanup(); localStorage.clear(); sessionStorage.clear(); });

  it('muestra y oculta el mensaje condicional cuando no hay coincidencias', () => {
    render(<MemoryRouter><SanaProvider><Catalogo /></SanaProvider></MemoryRouter>);
    const busqueda = screen.getByPlaceholderText('Psicología, nutrición…');
    expect(screen.queryByText('No hay especialidades que coincidan con los filtros.')).toBeNull();
    fireEvent.change(busqueda, {target: {value: 'especialidad-inexistente-999'}});
    expect(screen.getByRole('status').textContent).toContain('No hay especialidades');
    fireEvent.change(busqueda, {target: {value: ''}});
    expect(screen.queryByText('No hay especialidades que coincidan con los filtros.')).toBeNull();
  });

  it('un botón usa el texto y el callback recibidos por props', () => {
    function BotonPrueba({etiqueta, alPulsar}) {
      return <button onClick={alPulsar}>{etiqueta}</button>;
    }
    const alPulsar = jasmine.createSpy('alPulsar');
    render(<BotonPrueba etiqueta="Confirmar" alPulsar={alPulsar} />);
    fireEvent.click(screen.getByRole('button', {name: 'Confirmar'}));
    expect(alPulsar).toHaveBeenCalledTimes(1);
  });

  it('muestra error de acceso solo después de enviar credenciales inválidas', () => {
    render(<MemoryRouter><SanaProvider><Acceso /></SanaProvider></MemoryRouter>);
    expect(screen.queryByRole('alert')).toBeNull();
    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.cl'), {target: {value: 'noexiste@ejemplo.cl'}});
    fireEvent.change(screen.getByLabelText('Contraseña'), {target: {value: 'ClaveInvalida!'}});
    fireEvent.click(screen.getByRole('button', {name: 'Ingresar'}));
    expect(screen.getByRole('alert').textContent).toContain('Correo o contraseña incorrectos');
  });
});

import React from 'react';
import {render, screen, fireEvent, cleanup, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {SanaProvider} from '../src/context/SanaContext.jsx';
import Administracion from '../src/pages/Administracion.jsx';
import {leer} from '../src/data/almacen.js';

function mostrarAdmin() {
  sessionStorage.setItem('sana_sesion', JSON.stringify({id:'admin-test',nombre:'Admin de prueba', correo:'admin@ejemplo.cl',rol:'ADMIN'}));
  render(<MemoryRouter><SanaProvider><Administracion/></SanaProvider></MemoryRouter>);
}

describe('CRUD administrativo de SanaEsencia', () => {
  beforeEach(() => {localStorage.clear();sessionStorage.clear();});
  afterEach(() => {cleanup();localStorage.clear();sessionStorage.clear();});
  it('crea una especialidad y la muestra inmediatamente', () => {
    mostrarAdmin();
    fireEvent.click(screen.getByRole('button', {name:'Especialidades'}));
    const antes = leer('servicios').length;
    fireEvent.click(screen.getByRole('button', {name:'Agregar nuevo'}));
    fireEvent.change(screen.getByLabelText('Nombre'), {target:{value:'Especialidad de prueba'}});
    fireEvent.change(screen.getByLabelText('Descripción'), {target:{value:'Descripción de prueba'}});
    fireEvent.click(screen.getByRole('button', {name:'Guardar'}));
    expect(leer('servicios').length).toBe(antes + 1);
    expect(screen.getByText('Especialidad de prueba')).toBeTruthy();
  });
  it('crea un profesional vinculado a una especialidad y actualiza la lista', () => {
    mostrarAdmin();
    fireEvent.click(screen.getByRole('button', {name:'Profesionales'}));
    const antes = leer('profesionales').length;
    fireEvent.click(screen.getByRole('button', {name:'Agregar nuevo'}));
    fireEvent.change(screen.getByLabelText('Nombre'), {target:{value:'Profesional de prueba'}});
    const primera = leer('servicios')[0];
    fireEvent.change(screen.getByLabelText('Especialidad'), {target:{value:String(primera.id)}});
    fireEvent.click(screen.getByRole('button', {name:'Guardar'}));
    expect(leer('profesionales').length).toBe(antes + 1);
    expect(screen.getByText('Profesional de prueba')).toBeTruthy();
  });
});

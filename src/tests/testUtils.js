import { act } from "react";
import { createRoot } from "react-dom/client";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const montajes = [];

export function prepararPrueba() {
  window.localStorage.clear();
  window.sessionStorage.clear();
}

export function montar(elemento) {
  const contenedor = document.createElement("div");
  document.body.appendChild(contenedor);
  const raiz = createRoot(contenedor);
  montajes.push({ contenedor, raiz });
  act(() => raiz.render(elemento));
  return contenedor;
}

export function cambiarValor(elemento, valor) {
  const prototipo = elemento instanceof HTMLSelectElement
    ? HTMLSelectElement.prototype
    : elemento instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototipo, "value");
  descriptor.set.call(elemento, valor);
  act(() => elemento.dispatchEvent(new Event("input", { bubbles: true })));
  act(() => elemento.dispatchEvent(new Event("change", { bubbles: true })));
}

export function enviarFormulario(formulario) {
  act(() => formulario.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
}

export function desmontarTodo() {
  act(() => montajes.forEach(({ raiz }) => raiz.unmount()));
  montajes.splice(0).forEach(({ contenedor }) => contenedor.remove());
}

export function fechaFutura(dias = 1) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

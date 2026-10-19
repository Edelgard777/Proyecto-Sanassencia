import { useCallback, useEffect, useState } from "react";
import db from "../services/db.js";

function leerColeccion(nombre) {
  try {
    return { registros: db.leer(nombre), error: "", loading: false };
  } catch (error) {
    return {
      registros: [],
      error: error instanceof Error ? error.message : "No se pudo leer la colección.",
      loading: false,
    };
  }
}

export default function useColeccion(nombre) {
  const [coleccion, setColeccion] = useState(() => leerColeccion(nombre));
  const { registros, error, loading } = coleccion;

  const recargar = useCallback(() => {
    setColeccion(leerColeccion(nombre));
  }, [nombre]);

  useEffect(() => {
    const actualizarColeccion = (evento) => {
      if (evento.detail.nombre === nombre) recargar();
    };
    const actualizarDesdeOtraPestana = (evento) => {
      if (evento.key === `sanaesencia:${nombre}` || evento.key === null) recargar();
    };
    window.addEventListener(db.EVENT_NAME, actualizarColeccion);
    window.addEventListener("storage", actualizarDesdeOtraPestana);
    return () => {
      window.removeEventListener(db.EVENT_NAME, actualizarColeccion);
      window.removeEventListener("storage", actualizarDesdeOtraPestana);
    };
  }, [nombre, recargar]);

  const ejecutar = useCallback((operacion, ...argumentos) => {
    try {
      const resultado = db[operacion](nombre, ...argumentos);
      setColeccion({ registros: db.leer(nombre), error: "", loading: false });
      return resultado;
    } catch (operacionError) {
      setColeccion((actual) => ({
        ...actual,
        error: operacionError instanceof Error ? operacionError.message : "No se pudo actualizar la colección.",
      }));
      throw operacionError;
    }
  }, [nombre]);

  return {
    registros,
    error,
    loading,
    recargar,
    crear: useCallback((datos) => ejecutar("crear", datos), [ejecutar]),
    actualizar: useCallback((id, cambios) => ejecutar("actualizar", id, cambios), [ejecutar]),
    eliminar: useCallback((id) => ejecutar("eliminar", id), [ejecutar]),
  };
}

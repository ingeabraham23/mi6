
// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import "./TablaDinamica.css";

import {
  capturarElemento,
  generarNombreArchivo,
} from "../funciones/funcionesTablas";

function TablaDinamica({ datos }) {
  const tablaRef = useRef(null);

  if (!datos || !datos.columnas) return null;

  // NORMALIZAR COLUMNAS
  const columnas = Array.isArray(datos.columnas)
    ? datos.columnas
    : Object.entries(datos.columnas).map(([titulo, valores]) => ({
        titulo,
        datos: valores,
      }));

  // CANTIDAD MÁXIMA DE FILAS
  const totalFilas = Math.max(
    0,
    ...columnas.map((columna) => columna.datos?.length || 0)
  );

  // COLORES PERSONALIZADOS
  const colores = datos.colores || {};

  const estilo = {
    "--color-principal": colores.principal || "#243c5a",
    "--color-secundario": colores.secundario || "#35618e",
    "--color-encabezado": colores.encabezado || "#edf2f8",
  };

  // DESCARGAR TABLA
  const descargarTabla = () => {
    const nombre = generarNombreArchivo(
      datos.titulo || "tabla"
    );

    capturarElemento(tablaRef, nombre);
  };

  return (
    <div className="tabla-dinamica-pagina">

      {/* ELEMENTO QUE SE CAPTURARÁ */}
      <div
        className="tabla-dinamica-captura"
        ref={tablaRef}
        style={estilo}
      >

        {/* ENCABEZADO */}
        <div className="tabla-dinamica-titulo">
          <h2>{datos.titulo}</h2>

          {datos.subtitulo && (
            <p>{datos.subtitulo}</p>
          )}
        </div>

        {/* TABLA */}
        <div className="tabla-dinamica-scroll">
          <table className="tabla-dinamica">

            <thead>
              <tr>
                {columnas.map((columna, index) => (
                  <th key={index}>
                    {columna.titulo}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {totalFilas > 0 ? (
                Array.from({ length: totalFilas }).map(
                  (_, fila) => (
                    <tr key={fila}>
                      {columnas.map((columna, index) => (
                        <td key={index}>
                          {columna.datos?.[fila] ?? ""}
                        </td>
                      ))}
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={Math.max(columnas.length, 1)}>
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* PIE DE PAGINA */}
        {datos.piePagina && (
          <div className="tabla-dinamica-footer">
            {datos.piePagina}
          </div>
        )}

      </div>

      {/* BOTON FUERA DE LA CAPTURA */}
      <div className="tabla-dinamica-acciones">
        <button
          type="button"
          onClick={descargarTabla}
          className="tabla-dinamica-boton"
        >
          <span>↓</span>
          Descargar imagen
        </button>
      </div>

    </div>
  );
}

export default TablaDinamica;

import html2canvas from "html2canvas";

// CAPTURAR UN ELEMENTO HTML
export const capturarElemento = async (
  referencia,
  nombreArchivo = "tabla"
) => {
  if (!referencia?.current) {
    console.error("No se encontró el elemento para capturar");
    return;
  }

  try {
    const elemento = referencia.current;

    const canvas = await html2canvas(elemento, {
      scale: 6,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,

      // Expandir las columnas para capturarlas todas
      onclone: (documento) => {
        const clon = documento.querySelector(
          ".tabla-dinamica-captura"
        );

        if (!clon) return;

        const scroll = clon.querySelector(
          ".tabla-dinamica-scroll"
        );

        const tabla = clon.querySelector(
          ".tabla-dinamica"
        );

        if (scroll && tabla) {
          const ancho = tabla.scrollWidth;

          scroll.style.width = `${ancho}px`;
          scroll.style.maxWidth = "none";
          scroll.style.overflow = "visible";

          clon.style.width = `${ancho}px`;
          clon.style.maxWidth = "none";
        }
      },
    });

    // DESCARGAR IMAGEN
    const enlace = document.createElement("a");

    enlace.download = `${nombreArchivo}.png`;
    enlace.href = canvas.toDataURL("image/png");

    enlace.click();

  } catch (error) {
    console.error("Error al capturar la tabla:", error);
  }
};

// GENERAR NOMBRE DE ARCHIVO
export const generarNombreArchivo = (nombre) => {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};
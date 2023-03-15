export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));

  const formatoFecha = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-ES", formatoFecha);
};

export default formatearFecha;

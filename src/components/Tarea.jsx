import formatearFecha from "../helpers/formatearFecha";

const Tarea = ({ tarea }) => {
  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="">
        <p className="text-4xl mb-1">{nombre}</p>
        <p className="text-sm mb-1 uppercase text-gray-500">{descripcion}</p>
        <p className="text-4xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
          Editar
        </button>

        {estado ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}

        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;

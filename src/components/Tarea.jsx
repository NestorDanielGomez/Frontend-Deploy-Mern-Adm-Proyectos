import formatearFecha from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="text-4xl mb-1">{nombre}</p>
        <p className="text-sm mb-1 uppercase text-gray-500">{descripcion}</p>
        <p className="text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {prioridad}</p>
        {estado && (
          <p className="text-xs bg-green-500 uppercase p-1 rounded-lg text-white">
            Completada por: {tarea?.completado?.nombre}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}>
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}>
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;

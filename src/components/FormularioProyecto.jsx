import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id && proyecto.nombre) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //paso datos del form al provider
    await submitProyecto({ nombre, descripcion, fechaEntrega, cliente, id });
    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm">
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm">
          Descripcion
        </label>
        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm">
          Nombre Proyecto
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm">
          Nombre Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 w-full p-3 font-bold text-white cursor-pointer uppercase rounded hover:bg-sky-800 transition-colors"
        value={id ? "Actualizar Proyecto" : "Crear proyecto"}
      />
    </form>
  );
};

export default FormularioProyecto;

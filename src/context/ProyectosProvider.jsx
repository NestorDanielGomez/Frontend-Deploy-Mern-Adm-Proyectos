import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";
let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [buscador, setBuscador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/proyectos", config);

        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProyectos();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };
  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );
      //actualizo en state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);
      setAlerta({
        msg: "Proyecto Actualizado con Exito",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto Creado con Exito",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
      setAlerta({});
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      //actualizo en state
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 2000);
      setProyecto(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const nuevaTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(`/tareas`, tarea, config);

      socket.emit("nueva tarea", data);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      socket.emi("actualizar tarea", data);

      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await nuevaTarea(tarea);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      setModalEliminarTarea(false);

      socket.emit("eliminar tarea", tarea);
      setTarea({});
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );
      setProyecto(proyectoActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const completarTarea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );
      setTarea({});
      setAlerta({});
      console.log(data);
      socket.emit("cambiar estado", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  const submitTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = { ...proyectoActualizado.tareas, tarea };
    setProyecto(proyectoActualizado);
  };

  const elminiarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    setProyecto(proyectoActualizado);
  };

  const actualizarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cambiarEstadoTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
    setAlerta({});
  };
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        handleModalTarea,
        modalFormularioTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador,
        submitTareaProyecto,
        elminiarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos,
      }}>
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;

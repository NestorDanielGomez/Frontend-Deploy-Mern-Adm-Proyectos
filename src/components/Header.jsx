import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador, buscador } = useProyectos();
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-extrabold text-center mb-5 md:mb-0">
          ADM Proyectos
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            className="font-bold uppercase"
            type="button"
            onClick={handleBuscador}>
            Buscar Proyecto
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;

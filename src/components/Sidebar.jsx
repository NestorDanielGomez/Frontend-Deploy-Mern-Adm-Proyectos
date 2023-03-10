import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 ">
      <p className="font-bold text-xl">Hola: {auth.nombre}</p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg">
        Crear Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;

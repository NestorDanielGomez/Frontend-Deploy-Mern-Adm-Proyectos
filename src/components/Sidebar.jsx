import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 ">
      <p className="font-bold text-xl">
        Hola:{" "}
        <span className="uppercase font-bold text-sky-800">{auth.nombre}</span>
      </p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg">
        Crear Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;

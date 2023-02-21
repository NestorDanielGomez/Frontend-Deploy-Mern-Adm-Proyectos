import { Link } from "react-router-dom";
const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl capitalize">
        Reestablecer password{" "}
      </h1>
      <form action="" className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5 ">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Escribir tu nueva contraseña"
          />
        </div>

        <input
          type="submit"
          className=" mb-5 w-full bg-sky-700 text-white py-3 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 transition-colors"
          value="Guardar nueva contraseña"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿Ya tienes cuenta?, Iniciar Sesión
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm">
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default NuevoPassword;

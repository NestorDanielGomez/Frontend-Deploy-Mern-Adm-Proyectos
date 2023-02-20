import { Link } from "react-router-dom";

const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Crea tu cuenta y Administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form action="" className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5 ">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="my-5 ">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Email de registro"
          />
        </div>
        <div className="my-5 ">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Contraseña"
          />
        </div>
        <div className="my-5 ">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold">
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Repetir Contraseña"
          />
        </div>
        <input
          type="submit"
          className=" mb-5 w-full bg-sky-700 text-white py-3 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 transition-colors"
          value="Crear Cuenta"
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

export default Registrar;

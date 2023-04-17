import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAuth, cargando } = useAuth();

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: false,
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await clienteAxios.post(`/usuarios/login`, {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      setLoading(false);
      navigate("/proyectos");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Iniciar Sesión y Administra tus <span className="text-slate-700">Proyectos</span>
      </h1>
      {loading && <p className="text-center">Iniciando sesión</p>}
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handlesubmit} className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5 ">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Email de registro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className=" mb-5 w-full bg-sky-700 text-white py-3 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 transition-colors"
          value="Iniciar Sesion"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿No tienes cuenta?, Crea una...
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

export default Login;

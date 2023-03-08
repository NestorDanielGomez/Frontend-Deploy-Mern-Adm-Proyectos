import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setpPsswordModificado] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);

  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.axios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.message.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener como minimo 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setpPsswordModificado(true);
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
      <h1 className="text-sky-600 font-bold text-5xl capitalize">
        Reestablecer password{" "}
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          action=""
          className="my-10 bg-white shadow rounded-lg p-10 "
          onSubmit={handleSubmit}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className=" mb-5 w-full bg-sky-700 text-white py-3 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 transition-colors"
            value="Guardar nueva contraseña"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm">
          Iniciar Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;

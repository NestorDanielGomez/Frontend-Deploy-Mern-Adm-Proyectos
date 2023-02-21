const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-500 to-red-700" : "from-sky-500 to-sky-700"
      } bg-gradient-to-br text-center text-white p-3 my-10 rounded-xl uppercase font-bold text-sm`}>
      {alerta.msg}
    </div>
  );
};

export default Alerta;

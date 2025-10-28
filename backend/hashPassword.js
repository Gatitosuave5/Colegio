import bcrypt from "bcrypt";

const generarHash = async () => {
  const contraseña = "1234"; // cambia aquí la contraseña que quieras encriptar
  const hash = await bcrypt.hash(contraseña, 10);
  console.log("Contraseña encriptada:", hash);
};

generarHash();

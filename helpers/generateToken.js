const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
const generateToken = (user) => {
  const { _id, username, name, email, rol, premium } = user;
  //   Retornamos los datos que queremos mostrar en front al cliente al iniciar la sesion
  return jwt.sign(
    {
      _id,
      username,
      name,
      email,
      rol,
      premium,
    },
    secret,
    {
      // Tiempo que dura la sesion iniciada, se puede modificar
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;

require("dotenv").config();
// Desencriptar el token
const { expressjwt } = require("express-jwt");
const secret = process.env.JWT_SECRET_KEY;

// Esto lo configuramos ya que nosotros somos los dueños del server, en el caso de no serlo el host nos da la info
// Authorization es una palabra reservada por lo que la utilizamos pero en minusculas


const getToken = (req) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (authorization) {
    const [type, token] = authorization.split(" ");
    return type === "Token" || type === "Bearer" ? token : null;
  }
  return null;
};

const auth = expressjwt({
  secret,
  // El token lo configuramos con HS256 por lo que aca lo mencionamos
  algorithms: ["HS256"],
  userProperty: "user",
  getToken,
});

// Verificamos el rol
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.rol; // Obtener el rol del token JWT
    if (allowedRoles.includes(userRole)) {
      next(); // Permitir el acceso si el rol está en la lista permitida
    } else {
      res.status(403).json({ message: "No tienes permiso para acceder a esta ruta." });
    }
  };
};

module.exports = auth;
require("dotenv").config();
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

module.exports = auth;

// *Codigo mejorado
// require("dotenv").config();
// const { expressjwt } = require("express-jwt");

// const auth = expressjwt({
//   secret: process.env.JWT_SECRET_KEY,
//   algorithms: ["HS256"],
//   userProperty: "user",
//   getToken: (req) => {
//     const { Authorization } = req.headers;
//     if (Authorization) {
//       const [type, token] = Authorization.split(" ");
//       return ["Token", "Bearer"].includes(type) ? token : null;
//     }
//     return null;
//   },
// });

// module.exports = auth;

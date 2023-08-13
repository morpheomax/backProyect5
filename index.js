require("dotenv").config();
require("./models/User.model");
const userRoutes = require("./routes/User.routes");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(process.env.MONGO_URI + "tienda");

const express = require("express");
const app = express();

const port = process.env.PORT;

const corsOptions = {
  // origin: * // se utiliza asterisco cuando queremos que se acceda desde todo el mundo
  // Restingimos acceso segun nuestros puertos
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
// *middleware
// Cors (Recurso compartido de origen cruzado) restringe solicitudes de una ruta, es decir que podemos limitar el acceso de un server al nuestro
app.use(cors(corsOptions));

// Validar que los datos estan en formato JSON
app.use(express.json());
// redirecciona al archivo User.routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hola desde el servidor",
  });
});

// Escucha el servidor siempre va al final del codigo
app.listen(port, () => {
  console.log(`Servidor escuchando el puerto ${port}`);
});

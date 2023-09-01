require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Puerto por defecto 3000 si no está definido en las variables de entorno

const corsOptions ={
  // No es buena practica, pero esta vez la utilizare solo para realizar pruebas en producción de mi sitio, luego se debe comentar y descomentar el siguiente origin
  origin: ['http://localhost:5173', 'https://proy5-ecommerce.netlify.app'],

  // cuando pase a produccion descomentar el siguietne origin
  // origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200
}

// Conectar a MongoDB
mongoose
.connect(process.env.MONGO_URI+'tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conexión a MongoDB exitosa");
})
.catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1); // Detener el servidor en caso de error crítico de conexión
  });

  // Importar modelos antes de las rutas
require("./models/User.model");
require("./models/Category.models"); // Corregido el nombre del modelo
require("./models/Variants.models");
require("./models/Product.models");
require("./models/Contact.models")
require("./models/Store.models")

// Importar rutas después de los modelos
const userRoutes = require("./routes/User.routes");
const categoryRoutes = require("./routes/Category.routes");
const variantsRoutes = require("./routes/Variants.routes");
const productRoutes = require("./routes/Product.routes");
const contactRoutes = require("./routes/Contact.routes");
const storeRoutes = require("./routes/Store.routes");

// Middleware

app.use(cors(corsOptions)) // Habilitar CORS para todas las rutas
app.use(express.json());

// Rutas 

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/variants", variantsRoutes);
app.use("/products", productRoutes);
app.use("/contact", contactRoutes);
app.use("/store", storeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hola desde el servidor",
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Ha ocurrido un error en el servidor",
    error: err.message, // Esto muestra el mensaje de error específico
  });
});

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

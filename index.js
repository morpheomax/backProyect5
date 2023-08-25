require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Puerto por defecto 3000 si no está definido en las variables de entorno

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
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

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

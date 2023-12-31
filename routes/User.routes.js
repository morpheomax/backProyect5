const express = require("express");
const router = express.Router();
const {
  signUp,
  getUsers,
  // updateUser,
  // deleteUser,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
  // getUserProfile,
  // updateUserProfile,
  // deleteUserProfile,
} = require("../controllers/User.controller");
const auth = require("../middlewares/auth");


// Rutas de libre acceso CRUD
router.get("/", getUsers);
// Ruta para verificar si el correo electrónico ya está registrado
router.get("/check-email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error al verificar el correo electrónico:", error);
    return res.status(500).json({ exists: false });
  }
});
router.post("/", signUp);
// router.put("/", updateUser);
// router.delete("/", deleteUser);



// Definimos nuevamente las rutas, pero esta vez van a pasar por una autenticación antes de realizar alguna acción
router.post("/login", login);
router.get("/:_id", auth, getUserById);
router.put("/:_id", auth, updateUserById);
router.delete("/:_id", auth, deleteUserById);

// Rutas autenticadas para obtener, actualizar y eliminar el perfil del usuario logueado
// router.get("/me", auth, getUserProfile);
// router.put("/me", auth, updateUserProfile);
// router.delete("/me", auth, deleteUserProfile);



module.exports = router;

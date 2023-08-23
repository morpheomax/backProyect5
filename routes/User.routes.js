const express = require("express");
const router = express.Router();
const {
  signUp,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/User.controller");
const auth = require("../middlewares/auth");

// Rutas de libre acceso CRUD
router.get("/", getUsers);
router.post("/", signUp);
router.put("/", updateUser);
router.delete("/", deleteUser);

// Definimos nuevamente las rutas, pero esta vez van a pasar por una autenticación antes de realizar alguna acción
router.post("/login", login);
router.get("/:_id", auth, getUserById);
router.delete("/:_id", auth, deleteUserById);
router.put("/:_id", auth, updateUserById);

module.exports = router;

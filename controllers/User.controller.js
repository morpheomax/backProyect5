const mongoose = require("mongoose");
const User = mongoose.model("User");
const generateToken = require("../helpers/generateToken");
const hashedPassword = require("../helpers/hashedPassword");
const bcrypt = require("bcryptjs");

// recibe req y res
// Esta función recibe una solicitud (req) y una respuesta (res). Crea un nuevo documento de usuario en la base de datos utilizando el modelo de Mongoose y devuelve una respuesta con el estado 201 (creado) y los detalles del usuario creado en el cuerpo de la respuesta.
const signUp = async (req, res) => {
  console.log(req.body)
  const { name, lastname, username, email, password, address, addressNumber, commune, city, reference, postalcode, phone, rol, premium } = req.body;
  const emailLowerCase = email.toLowerCase();
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regexPassword.test(password)) {
    return res.status(401).json({
      message:
        "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
    });
  }

  // encriptamon la password
  const hashPassword = hashedPassword(password);

  try {
    const user = new User({
      name, lastname, username, email:emailLowerCase, password:hashPassword, address, addressNumber, commune, city, reference, postalcode, phone, rol, premium
    });
    const response = await user.save();
    const token = generateToken(response);

    // status 201 que significa creado
    return res.status(201).json({
      message: `User created ${user}`,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};


//Esta función recibe una solicitud (req) y una respuesta (res). Consulta todos los documentos de usuarios en la base de datos y devuelve una respuesta con el estado 200 (éxito) y los detalles de todos los usuarios en el cuerpo de la respuesta.
const getUsers = async (req, res) => {
  try {
    const response = await User.find();
    return res.status(200).json({
      message: "Ok",
      detail: response,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};

// // Actualiza datos de usuario
// const updateUser = async (req, res) => {
//   const { _id, userUpdated } = req.body;
//   console.log(_id, userUpdated);
//   try {
//     const response = await User.findByIdAndUpdate(_id, userUpdated, {
//       new: true,
//     });
//     return res.status(200).json({
//       message: "Ok",
//       detail: response,
//     });
//   } catch (err) {
//     return res.status(404).json({
//       message: "Internal Server Error",
//       detail: err,
//     });
//   }
// };

// // Elimina datos de usuario
// const deleteUser = async (req, res) => {
//   const { _id } = req.body;

//   try {
//     const response = await User.findByIdAndDelete(_id);

//     return res.status(200).json({
//       message: "Ok",
//       detail: response,
//     });
//   } catch (err) {
//     return res.status(404).json({
//       message: "Internal Server Error",
//       detail: err,
//     });
//   }
// };


const login = async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const passwordHash = hashedPassword(password);

  try {
    // confimar email
    const userValidated = await User.findOne({ email: emailLowerCase });

    if (!userValidated) {
      return res.status(401).json({
        message: "Usuario no registrado",
      });
    }

    console.log(`${userValidated.password} vs ${passwordHash}`);

    // Validar Password compara la contraseña proporcionada con la contraseña hash almacenada
    if (userValidated.password === passwordHash) {
      console.log(`coinciden`);

      const token = generateToken(userValidated);

      return res.status(200).json({
        message: "User logged is successfully",
        // Enviamos el ID con userId: a la consola para verificar la info, esto luego en producción se debe eliminar
        userId: userValidated._id,
        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      return res.status(200).json({
        message: "ok",
        detail: user,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      err,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndDelete({ _id });
    if (user) {
      return res.status(200).json({
        message: "User deleted successfully",
        detail: user,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Actualiza un usuario por su ID
const updateUserById = async (req, res) => {
  const { _id } = req.params;
  const  userUpdated  = req.body;
  const { password } = userUpdated;

  // Hash the password before updating
  const hashPassword = hashedPassword(password);

  
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...userUpdated, password: hashPassword },
      { new: true }
    );
    console.log("Updated User:", user); // Agregado

    if (user) {
      return res.status(200).json({
        message: "User updated successfully",
        detail: user,
      });
    }
    console.log("Response Status:", res.status); // Agregado
    return res.status(404).json({
      message: "User not found",
    });
    
  } catch (err) {
    console.log("Error:", err); // Agregado
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


// Controlador para obtener los datos del usuario logueado
const getUserProfile = async (req, res) => {
  try {
    // Recupera el usuario desde el objeto de solicitud (req) 
    // Este usuario se añade previamente a la solicitud en el middleware de autenticación
    const user = req.user;

    // Verifica si se encontró un usuario
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // Realiza cualquier verificación de seguridad necesaria aquí.
    // Por ejemplo, podrías comprobar si el usuario tiene permisos para acceder a esta información.

    // Devuelve los datos del usuario logueado como respuesta
    res.json({
      message: 'OK',
      detail: user,
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    // Recupera el usuario desde el objeto de solicitud (req) 
    // Este usuario se añade previamente a la solicitud en el middleware de autenticación
    const user = req.user;

    // Verifica si el cuerpo de la solicitud contiene datos válidos para actualizar
    if (!req.body) {
      return res.status(400).json({ error: 'Datos de actualización faltantes' });
    }

    // Actualiza los campos del usuario con los datos proporcionados en el cuerpo de la solicitud
    Object.assign(user, req.body);

    // Guarda el usuario actualizado en la base de datos
    await user.save();

    // Devuelve los datos del usuario actualizados como respuesta
    res.json(user);
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar el perfil del usuario logueado
const deleteUserProfile = async (req, res) => {
  try {
    // Recupera el usuario desde el objeto de solicitud (req) 
    // Este usuario se añade previamente a la solicitud en el middleware de autenticación
    const user = req.user;

    // Verifica si se encontró un usuario
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // Elimina el usuario de la base de datos
    await user.remove();

    // Devuelve una respuesta exitosa
    res.json({ message: 'Perfil de usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el perfil del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};




module.exports = {
  signUp,
  getUsers,
  login,
  getUserById,
  updateUserById,
  deleteUserById,

  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

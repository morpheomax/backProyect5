// middlewares/checkRole.js

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.user; // Suponemos que la información del usuario está en req.user
  
      if (!user || !user.role) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
  
      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (allowedRoles.includes(user.role)) {
        // Si el rol del usuario está permitido, continúa con la siguiente función de middleware
        next();
      } else {
        // Si el rol del usuario no está permitido, devolver un error 403 (Prohibido)
        return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta" });
      }
    };
  };
  
  
  module.exports = checkRole;
  
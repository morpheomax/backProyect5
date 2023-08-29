// Crypto es nativa de Node
const crypto = require("crypto");
// Salt que es para encriptar del archivo .env
const salt = process.env.SALT;

// Encriptamos la password
const hashedPassword = (password) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
};

module.exports = hashedPassword;

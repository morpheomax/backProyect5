const auth = require("../middlewares/auth");

// Información de la tienda
const {
    createStore,
    getStore,
    updateStore,
    deleteStore,

} = require('../controllers/Store.controller')

// Rutas para información de la tienda

router.post("/store", auth, createStore); 
router.get("/store", getStore);
router.put("/store/:id", auth, updateStore); 
router.delete("/store/:id", auth, deleteStore); 

module.exports = router;
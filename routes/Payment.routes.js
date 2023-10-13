const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { createPayment, successPayment, pendingPayment, failurePayment } = require("../controllers/Payment.controller");

router.get('/',  (req, res) =>{
    res.json({
      message: 'Ruta Payment'
    })
  })


router.post('/create-payment', createPayment)

router.post('/success-payment', successPayment)

router.post('/pending-payment', pendingPayment)

router.post('/failure-payment', failurePayment)


module.exports = router;
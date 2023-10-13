const mongoose = require("mongoose");
const mercadoPago = require("mercadopago");

const items=[{
    id: '1234',
    title: 'Curso de React',
    description: 'Curso de React desde absoluto cero',
    picture_url:'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    quantity: 1,
    currency_id:'CLP',
    unit_price:10000
}]



const createPayment=async(req,res)=>{

    const {id, title, unit_price, quantity, currency_id} = req.body

    try {
        mercadoPago.configure({
            access_token: 'TEST-2612932320594988-090816-a642606657f3f45d3618ace6fd637659-85402375'
        })
        const preference={
            items,
            // Rutas de retorno en el front
            back_urls:{
            success: 'http://localhost:5173/success-payment',
            pending: 'http://localhost:5173/pending-payment',
            failure: 'http://localhost:5173/failure-payment',
            }
        }
        const response= await mercadoPago.preferences.create(preference)
        return res.status(200).json({
            message: 'Create payment',
            detail: response
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            error
        })
    }
 
}

const successPayment = async(req,res)=>{

    return res.status(200).json({
        message: 'Success payment',
        detail: req.query
    })

}


const pendingPayment = async(req,res)=>{

    return res.status(200).json({
        message: 'Pending Payment',
        detail: req.query
    })

}


const failurePayment = async(req,res)=>{

    return res.status(200).json({
        message: 'Failure Payment',
        detail: req.query
    })

}




module.exports={createPayment, successPayment, pendingPayment, failurePayment}
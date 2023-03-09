const express = require('express')
const { sendSTRIPEKey, processPayment } = require('../controller/paymentController')
const router = express.Router()

router.get('/getStripeKey', sendSTRIPEKey)
router.post('/processpayment', processPayment)

module.exports = router
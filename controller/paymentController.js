const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// send stripe API key
exports.sendSTRIPEKey = (req, res) => {
    res.send({STRIPE_API_KEY: process.env.STRIPE_API_KEY})
}


// payment processing
exports.processPayment = async (req, res) => {
    const myPaymentIntents = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'npr',
        metadata: {integration_check:"Accept_a_Payment"}
    })
    res.send({client_secret: myPaymentIntents.client_secret})
}
const express = require('express')
const { placeOrder, getAllOrders, getOrderDetails, userOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const router = express.Router()

router.post('/placeorder', placeOrder)
router.get('/getallorders', getAllOrders)
router.get('/getorderdetail/:id', getOrderDetails)
router.get('/userorders/:user_id', userOrders)
router.put('/updateorder/:id', updateOrder)
router.delete('/deleteorder/:id', deleteOrder)

module.exports = router
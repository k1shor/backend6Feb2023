const Order = require('../models/OrderModel')
const OrderItems = require('../models/OrderItemsModel')

// place order
exports.placeOrder = async (req, res) => {
    // store all order items in OrderItems , return ids
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItem=>{
            let orderItemToAdd = new OrderItems({
                product : orderItem.product,
                quantity: orderItem.quantity
            })
            orderItemToAdd = await orderItemToAdd.save()
            if(!orderItemToAdd){
                return res.status(400).json({error:"Something went wrong"})
            }
            return orderItemToAdd._id
        })
    )
    // calculate total
    let individual_total = await Promise.all(
        orderItemsIds.map(async orderItemId=>{
            let orderItem = await OrderItems.findById(orderItemId).populate('product','product_price')
            return orderItem.quantity * orderItem.product.product_price
        })
    )
    let total = individual_total.reduce((acc, cur)=> acc+cur)
    // store order info
        let orderToPlace = new Order({
            orderItemsIds: orderItemsIds,
            total: total,
            user: req.body.user,
            shipping_address: req.body.shipping_address,
            alternate_shipping_address: req.body.alternate_shipping_address,
            city: req.body.city,
            country: req.body.country,
            zipcode: req.body.zipcode,
            phone: req.body.phone
        })
        orderToPlace = await orderToPlace.save()
        if(!orderToPlace){
            return res.status({error:"Failed to place order"})
        }
        res.send(orderToPlace)
}

// [{samsung, 5} , {nokia, 3}] - 
// [sam_id, nok_id]
// [5000, 600, 1000 , 500]


// to view all orders
exports.getAllOrders = async(req, res) => {
    let orders = await Order.find()
    .populate('user','username')
    .populate({path:'orderItemsIds',populate: {path:'product',populate:'category'}})
    if(!orders){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(orders)
}

// to get order details
exports.getOrderDetails = async(req, res) => {
    let order = await Order.findById(req.params.id)
    .populate('user','username')
    .populate({path:'orderItemsIds',populate: {path:'product',populate:'category'}})
    if(!order){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(order)
}

// to get orders of a user
exports.userOrders = async (req, res) => {
    let orders = await Order.find({user:req.params.user_id})
    .populate({path:'orderItemsIds',populate: {path:'product',populate:'category'}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(orders)
}

// to update order status
exports.updateOrder = async (req, res) => {
    let order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, {new:true})

    if(!order){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(order)
}

// to delete order
exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(order=>{
        if(order==null){
            return res.status(400).json({error:"Order not found"})
        }
        order.orderItemsIds.map(orderItem=>{
            OrderItems.findByIdAndRemove(orderItem)
            .then(item=>{
                if(!item){
                    return res.status(400).json({error:"Something went wrong"})
                }

            })
        })
        res.send({message:"Order deleted"})
    })
    .catch(err=>res.status(400).json({error:"Something went wrong"}))
}
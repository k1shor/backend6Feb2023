/*

itema - 3
itemb - 2

orderitems - [ida, idb, idc, idd, ide]
user
shipping address
total

*/

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItemsIds: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    alternate_shipping_address: {
        type: String
    },
    city:{
        type: String,
        required :true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        required: true
    }
})
module.exports = mongoose.model("Order", orderSchema)
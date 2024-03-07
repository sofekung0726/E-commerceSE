const mongoose = require("mongoose")
const {Schema , model} = mongoose


const CartSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    email:{type:String , require: true},
    price:{type:Number , require: true},
    name:{type:String , require: true},
    image:{type:String , require: true},
    quantity:{type:Number , require: true},
},
    {
    timestamps:true,
    }
)
const CartModel = model("Cart", CartSchema)
module.exports = CartModel
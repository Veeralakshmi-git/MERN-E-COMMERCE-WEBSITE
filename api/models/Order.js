const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    productId :{ type: String, required: true},
    title :{ type: String, required: true, unique: true},
    desc : { type: String, required: true },
    img : { type: String, required: true },
    categories: { type: Array },
    size:{ type: Array },
    color:{ type: Array },
    price:{ type: Number, required: true },
    quantity:{type:Number,required: true,default:1},
    
    
},
    {timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
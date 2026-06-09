import mongoose from "mongoose";
const cartShema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
items:[
    {
        menuItem:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Menu",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
        },
    },
],

},{timestamps:true});

const Cart=mongoose.model("Cart",cartShema);
export default Cart;
import mongoose, { Schema } from "mongoose";


const product= new Schema({
    ProductImg:{type:String},
    Title:{type:String},
    Price:{type:Number},
    Quntity:{type:Number,},
    Brand:mongoose.Types.ObjectId,
    Description:{type:String},
    Category:mongoose.Types.ObjectId,
    createdAt:{type:Date, default:Date.now},

})
export default new mongoose.model("AddProduct",product);
import mongoose,{Schema} from "mongoose";

const Category=new Schema({
   
    category:{type:String}
})

export default  new mongoose.model("category",Category)
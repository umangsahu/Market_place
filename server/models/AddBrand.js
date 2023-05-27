import mongoose,{Schema, mongo}from "mongoose"

const brands=new Schema({
    brandImg:{type:String},
    brand:{type:String},
    brandColor:{type:String},
    category_id:mongoose.Types.ObjectId
})

export default mongoose.model("Brand",brands)
import mongoose,{Schema, model} from "mongoose"


const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin:{type:Boolean,default:false}
  });


  export default new mongoose.model("Userdata",userSchema);
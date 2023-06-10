import { Router } from "express";
import  uploadMiddleware from "../middleware/multerMiddleware.js"
import product from "../models/AddProduct.js"
import passport from "passport";
import userSchema from '../models/addUser.js'

const router=Router();


router.get("/", async (req, res) => {
    // const { key, value } = req.query; // Assuming the key and value are passed as query parameters
    // const keyTransformed=key[0].toUpperCase()+key.slice(1)
    
    const productsData = await product.find().sort({ createdAt: -1 });
    res.json({ data: productsData });
    
  });


router.post("/",passport.authenticate('jwt',{session:false}),uploadMiddleware.single("productImage"),async(req,res)=>{

if(req.file){
console.log("hello world");
const products=new product({
    ProductImg:req.file.filename,
    Title:req.body.title,
    Price:req.body.price,
    Quntity:req.body.quantity,
    Brand:req.body.brand,
    Description:req.body.description,
    Category:req.body.category,
    User:req.user._id
})

const data=await products.save();

//initially admin is false but someone add product its means now its admin
if(!req.user.isAdmin){
await userSchema.findOneAndUpdate({ _id:req.user._id}, { isAdmin:true }, { new: true })
}

res.send("products add succesfully")
}else{
    res.status(400)
}
})

export default router;
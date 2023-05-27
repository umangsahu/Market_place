import { Router } from "express";
import  uploadMiddleware from "../middleware/multerMiddleware.js"
import product from "../models/AddProduct.js"



const router=Router();


router.get("/", async (req, res) => {
    const { key, value } = req.query; // Assuming the key and value are passed as query parameters
    const keyTransformed=key[0].toUpperCase()+key.slice(1)
    const productsData = await product.find({[keyTransformed]:value });
    res.json({ data: productsData });
    
  });


router.post("/",uploadMiddleware.single("productImage"),async(req,res)=>{
if( req.file){

const products=new product({
    ProductImg:req.file.filename,
    Title:req.body.title,
    Price:req.body.price,
    Quntity:req.body.quantity,
    Brand:req.body.brand,
    Description:req.body.description,
    Category:req.body.category,
    
})

const data=await products.save();

res.send("products add succesfully")
}else{
    res.status(400)
}
})

export default router;
import mongoose from 'mongoose'
import Brand from "../models/AddBrand.js"
import { Router } from 'express'
 import uploadMiddleware from '../middleware/multerMiddleware.js';

const router=Router();


router.get('/',async(req,res)=>{
    const allPhotos=await Brand.find();
    res.json({data:allPhotos});
})



router.post("/",uploadMiddleware.single("image"),async(req,res)=>{
    if(req.file!=undefined){
    const photo=req.file.filename;

   const BrandData= new Brand({
    brandImg:photo,
    brand:req.body.brandName,
    brandColor:req.body.brandColor,
    category_id:req.body.category
   })

   const response =await BrandData.save();


   res.status(200).send("succefuslly upload");}
  else{
    res.status(400).send("your file type is not supported")
  }

   
    
})

export default router;
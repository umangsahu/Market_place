import mongoose from 'mongoose'
import Brand from "../models/AddBrand.js"
import { Router } from 'express'
import AddCategory from '../models/AddCategory.js';

const router=Router();



router.get('/',async(req,res)=>{
    const data=await AddCategory.find();
    res.json({categories:data});
})


export default router;
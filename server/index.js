import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import productapi from "./routers/product.js"
import Brand from "./routers/brand.js"
import categoryapi from "./routers/categories.js"
import dotenv from 'dotenv'
import auth from './routers/auth.js'
import passport from 'passport';
import passportConfig from "./config/passport.js"
import order from "./routers/order.js"

const app=express();
dotenv.config()
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
passportConfig(passport);



const PORT=process.env.PORT||27713;






app.get("/",(req,res)=>{
res.send("hello world");
})

app.use("/product",productapi);
app.use("/brand",Brand);
app.use("/category",categoryapi);
app.use("/auth",auth);
app.use("/order",order);





mongoose.connect(`${process.env.Mongo}`,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
console.log("mongo db connection is succesfull");}).catch((err)=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log("server is running on"+PORT);
   
})

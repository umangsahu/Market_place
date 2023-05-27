import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import productapi from "./routers/product.js"
import Brand from "./routers/brand.js"
import categoryapi from "./routers/categories.js"
const app=express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

const PORT=process.env.PORT||27713;






app.get("/",(req,res)=>{
res.send("hello world");
})

app.use("/product",productapi);
app.use("/brand",Brand);
app.use("/category",categoryapi);





mongoose.connect("mongodb+srv://umangsahu:Umang123@umang.zswrbve.mongodb.net/ecommerce?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
console.log("mongo db connection is succesfull");}).catch((err)=>{
    console.log(err)
}
)
app.listen(PORT,()=>{
    console.log("server is running on"+PORT);
})
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import  path from 'path';


const storage=multer.diskStorage({
    destination:function(req, file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,`${uuidv4()}_${path.extname(file.originalname)}`)
    }
})

//filter function

const fileFilter=(req,file,cb)=>{
    const allowedFiletypes=["image/jpeg" , "image/jpg" , "image/png","image/webp"];
if(allowedFiletypes.includes(file.mimetype)){
    cb(null,true)
}else{
    cb(false)
}
}

const uploadMiddleware=multer({storage,fileFilter});
 //module.exports= uploadMiddleware;

 export default uploadMiddleware;

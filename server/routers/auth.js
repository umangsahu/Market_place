import { Router } from "express";
import userSchema from '../models/addUser.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const router=Router();
const saltRounds=10;
const salt = bcrypt.genSaltSync(saltRounds);



router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user with the given email already exists
  const existingUser = await userSchema.findOne({ email });

  if (existingUser) {
    // User already exists, return an error response
 
     res.status(409).json({ error: 'User with this email already exists' });
    
  }
else{
   // If user does not exist, hash the password
   const hash = bcrypt.hashSync(password, salt);

   // Create a new user instance
   const newUser = new userSchema({
     firstName,
     lastName,
     email,
     password: hash,
    //  isAdmin:false
   });
 
   // Save the new user to the database
   await newUser.save();
 
   // Return a success response
   res.status(200).json({ status: 200, message: 'User added successfully' });
}
 
})



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user with the given email exists
  const existingUser = await userSchema.findOne({ email });

  if (!existingUser) {
    // User does not exist, return an error response
     res.status(404).json({ message: 'User not found' });
  }else{
     // Compare the provided password with the hashed password in the database
  const passwordMatch = bcrypt.compareSync(password, existingUser.password);

  if (!passwordMatch) {
    // Passwords do not match, return an error response
    return res.status(401).json({ message: 'Invalid password' });
  }


  //jwt token
  const payload={
    email:existingUser.email,
    id:existingUser._id
  }
  const secret=process.env.Secret;
  // User is authenticated, return a success response

  const token=jwt.sign(payload,secret);
  res.status(200).json({ status: 200, message:'User authenticated successfully',token});

  }

 
});

export default router
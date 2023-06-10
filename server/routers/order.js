import { Router } from 'express';
import Razorpay from 'razorpay';

const router = Router();

// Create a new instance of Razorpay
const razorpay = new Razorpay({
  key_id: 'rzp_test_OVC4Xo42A3s3Mn',
  key_secret: 'y02UYWwXxD5io3E2J6u6HDL5',
});


router.post('/', async (req, res) => {
  try {
    // Extract the amount from the request body
    let { amount } = req.body;
 

    // Create an order using Razorpay
    const order = await razorpay.orders.create(
      {
      amount, // Amount in paise (e.g., 10000 represents ₹100)
      currency: 'INR',
      receipt: 'order_receipt',
    });
    res.json({ order});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



router.post('/api/paymentverification',async(req,res)=>{
console.log(req.body);
res.json({sucess:true})
})
export default router;

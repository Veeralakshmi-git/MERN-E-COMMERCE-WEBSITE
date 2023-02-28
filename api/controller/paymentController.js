const catchAsyncError = require("../middlewares/catchAsyncError");
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"}
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
})

exports.sendStripeApi = catchAsyncError(async (req,res,next) => {
    res.status(200).json({
       stripeApiKey : process.env.STRIPE_KEY
      });
})
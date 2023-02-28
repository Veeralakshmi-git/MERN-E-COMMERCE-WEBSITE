const { processPayment, sendStripeApi } = require("../controller/paymentController");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.route("/process").post( processPayment)
router.route("/stripeapi").get(  sendStripeApi)


module.exports = router
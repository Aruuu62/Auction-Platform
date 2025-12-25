const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  instantBuy,
  releasePayment
} = require("../controllers/paymentController");

// Buyer side
router.post("/instant-buy/:id", auth, instantBuy);

// Admin side
router.post("/release/:id", admin, releasePayment);

module.exports = router;

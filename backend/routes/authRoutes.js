const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/authController");

const {
  register,
  verifyOTP,
  login,
  uploadKYC
} = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/kyc", auth, upload.single("document"), uploadKYC);

module.exports = router;

// Show Portal Selection Page
router.get("/select-role", (req, res) => res.render("auth/select-role"));

// Show Login/Register (Reading the '?type=' query)
router.get("/login", (req, res) => {
    const type = req.query.type || 'user'; // Default to user
    res.render("auth/login", { type });
});

router.get("/register", (req, res) => {
    const type = req.query.type || 'user';
    res.render("auth/register", { type });
});

router.get("/logout", controller.logout);

module.exports = router;
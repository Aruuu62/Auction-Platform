const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getUserDashboard } = require("../controllers/userController");

// Protect this route so only logged-in users can see it
router.get("/dashboard", auth, getUserDashboard);

module.exports = router;
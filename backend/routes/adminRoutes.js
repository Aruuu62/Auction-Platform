const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/adminController");

// --- MIDDLEWARE: CHECK IF ADMIN ---
// This runs before every admin route to ensure security.
const checkAdmin = (req, res, next) => {
    // 1. Check if user is logged in (req.user exists from 'auth' middleware)
    // 2. Check if their role is 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // Allow access
    } else {
        // If not admin, deny access and show error on homepage
        // Using return to stop execution
        return res.status(403).render("index", { 
            title: "Home", 
            auctions: [], 
            user: req.user,
            error: "⛔ Access Denied: Admins Only" 
        });
    }
};

// --- ROUTES ---

// 1. Admin Dashboard (View Pending Items)
// IMPORTANT: Matches 'getAdminDashboard' in your controller
router.get("/dashboard", auth, checkAdmin, controller.getAdminDashboard);

// 2. Approve Item (Make it Active)
router.post("/approve/:id", auth, checkAdmin, controller.approveAuction);

// 3. Reject Item (Delete it)
router.post("/reject/:id", auth, checkAdmin, controller.rejectAuction);

// 4. End Auction Early
router.post("/end-early/:id", auth, checkAdmin, controller.endAuctionEarly);

module.exports = router;
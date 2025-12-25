const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/auctionController");

// Page Routes
router.get("/", controller.getAllAuctions);
router.get("/create", auth, controller.renderCreatePage);
router.get("/:id", controller.getAuctionDetails);

// Action Routes
router.post("/create", auth, upload.single("image"), controller.createAuction);
router.post("/bid/:id", auth, controller.placeBid);

// DELETE ROUTE (NEW)
router.post("/delete/:id", auth, controller.deleteAuction);

module.exports = router;
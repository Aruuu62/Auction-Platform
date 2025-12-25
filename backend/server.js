require("dotenv").config({ path: "./backend/config/config.env" });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// IMPORT MODELS
const { sequelize, Auction } = require("./models"); 
const checkUser = require("./middleware/checkUser");

// --- MIDDLEWARE ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files (CSS, Images, Uploads)
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/uploads", express.static(path.join(__dirname, "../frontend/public/uploads")));

// Global User Check (Runs on every page load)
app.use(checkUser);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));


// --- PAGE ROUTES (Frontend Navigation) ---
// These allow you to visit pages like /, /login, /register directly in the browser

// 1. Home Page
app.get("/", async (req, res) => {
  try {
    // Fetch top 3 active auctions for the "Featured" section
    const auctions = await Auction.findAll({
      where: { status: 'active' },
      limit: 3,
      order: [["createdAt", "DESC"]]
    });
    // Pass 'user' (from checkUser middleware) so the navbar knows if we are logged in
    res.render("index", { title: "Home", auctions, user: res.locals.user });
  } catch (err) {
    console.error("Home Page Error:", err);
    res.render("index", { title: "Home", auctions: [], user: res.locals.user });
  }
});

// 2. Portal Selection Page
app.get("/select-role", (req, res) => {
  res.render("auth/select-role", { user: res.locals.user });
});

// 3. Login Page
app.get("/login", (req, res) => {
  // If already logged in, redirect to the correct dashboard
  if (res.locals.user) {
    return res.redirect(res.locals.user.role === 'admin' ? '/api/admin/dashboard' : '/api/user/dashboard');
  }
  const type = req.query.type || 'user';
  res.render("auth/login", { type, user: null });
});

// 4. Register Page
app.get("/register", (req, res) => {
  // If already logged in, redirect to dashboard
  if (res.locals.user) {
    return res.redirect(res.locals.user.role === 'admin' ? '/api/admin/dashboard' : '/api/user/dashboard');
  }
  const type = req.query.type || 'user';
  res.render("auth/register", { type, user: null });
});


// --- API ROUTES (Backend Logic) ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auction", require("./routes/auctionRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/user", require("./routes/userRoutes"));


// --- SOCKET.IO SETUP ---
const socketFile = require("./socket");
socketFile(io);
app.set("socketio", io); // Save IO so controllers can use it


// --- START SERVER ---
const PORT = process.env.PORT || 5000;

// CHANGED 'force: true' to 'force: false' so you don't lose data on restart!
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
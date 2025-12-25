const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// --- REGISTER CONTROLLER ---
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body;

    // 1. ADMIN SECURITY CHECK
    // If user tries to register as 'admin', they MUST provide the correct secret key.
    if (role === 'admin') {
        const REAL_SECRET = "wow"; // <--- CHANGE THIS to your preferred secret password
        
        if (adminSecret !== REAL_SECRET) {
            // Security failed: Reload page with error
            return res.render('auth/register', { 
                type: 'admin', 
                error: "❌ Invalid Admin Secret Key! Access Denied." 
            });
        }
    }

    // 2. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 3. Determine Final Role (Safe default is 'user')
    const finalRole = (role === 'admin') ? 'admin' : 'user';

    // 4. Create User in Database
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole 
    });

    // 5. Success! Redirect to the correct login portal
    res.redirect(`/login?type=${finalRole}`);

  } catch (err) {
    console.error("Registration Error:", err);
    // If email is taken or other error, show the form again with the error message
    res.render('auth/register', { 
        type: req.body.role || 'user', 
        error: "Registration failed. This email might already be in use." 
    });
  }
};

// --- VERIFY OTP CONTROLLER ---
exports.verifyOTP = async (req, res) => {
  // Placeholder: Implement OTP verification logic here
  res.status(501).json({ message: "OTP verification not implemented yet" });
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User by Email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.render("auth/login", { 
            type: 'user', // Default to user view if unknown
            error: "❌ User not found" 
        });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("auth/login", { 
            type: user.role, // Keep the correct portal look
            error: "❌ Invalid Credentials" 
        });
    }

    // 3. Generate Token (Session)
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    // 4. Set Cookie
    res.cookie("token", token, { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 // 1 Day
    });

    // 5. --- SMART REDIRECT LOGIC ---
    // If Admin -> Go to Admin Dashboard
    // If User  -> Go to User Dashboard
    if (user.role === "admin") {
        return res.redirect("/api/admin/dashboard");
    } else {
        return res.redirect("/api/user/dashboard");
    }

  } catch (err) {
    console.error("Login Error:", err);
    res.render("auth/login", { 
        type: 'user', 
        error: "Server Error during login." 
    });
  }
};

// --- UPLOAD KYC CONTROLLER ---
exports.uploadKYC = async (req, res) => {
  // Placeholder: Implement KYC upload logic here
  res.status(501).json({ message: "KYC upload not implemented yet" });
};

exports.logout = (req, res) => {
    // This command tells the browser to delete the cookie
    res.clearCookie("token");
    // Redirect user back to the login page
    res.redirect("/login");
};
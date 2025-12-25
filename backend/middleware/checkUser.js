const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null; // Default: No user

    if (token) {
        try {
            // 1. Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 2. Find the user in DB
            const user = await User.findByPk(decoded.id);
            
            // 3. Save user to 'res.locals' so ALL EJS files can see it
            if (user) {
                req.user = user;
                res.locals.user = user; 
            }
        } catch (err) {
            console.log("Token invalid, clearing cookie");
            res.clearCookie("token");
        }
    }
    next();
};
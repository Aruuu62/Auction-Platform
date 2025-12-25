module.exports = (req, res, next) => {
  // 1. Safety Check: Is the user logged in?
  if (!req.user) {
    return res.redirect('/login');
  }

  // 2. Role Check: Is the user an admin?
  if (req.user.role !== "admin") {
    // If they are logged in but not an admin, send them to the main page
    return res.redirect('/api/auction'); 
  }

  next();
};

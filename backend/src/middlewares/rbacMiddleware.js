// Check user role
exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized access." });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden access." });
      }
  
      next();
    };
  };
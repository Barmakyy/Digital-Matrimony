module.exports = function (req, res, next) {
  console.log('OfficerMiddleware req.user:', req.user); // Debug log
  if (!req.user || (req.user.role !== 'officer' && req.user.role !== 'admin')) {
    return res.status(403).json({ message: 'Officer or admin access required' });
  }
  next();
}; 
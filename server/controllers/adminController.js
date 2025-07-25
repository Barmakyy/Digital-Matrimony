const User = require('../models/User');

// Promote a user to officer or admin
exports.promoteUser = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    if (!userId || !['officer', 'admin'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid userId or role' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = newRole;
    await user.save();
    res.json({ message: `User promoted to ${newRole}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'id name email role createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 
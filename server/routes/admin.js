const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

// Promote user to officer or admin
router.post('/promote', auth, admin, adminController.promoteUser);
// Get all users
router.get('/users', auth, admin, adminController.getAllUsers);

module.exports = router; 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const officer = require('../middleware/officerMiddleware');
const admin = require('../middleware/adminMiddleware');
const controller = require('../controllers/marriageApplicationController');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
const path = require('path');

// Submit a new application
router.post('/', auth, controller.submitApplication);
// Get all applications for the logged-in user
router.get('/', auth, controller.getMyApplications);
// Officer: Get all pending applications
router.get('/pending', auth, officer, controller.getPendingApplications);
// Officer: Get all applications
router.get('/all', auth, officer, controller.getAllApplications);
// Officer: Approve application
router.post('/:id/approve', auth, officer, controller.approveApplication);
// Officer: Reject application
router.post('/:id/reject', auth, officer, controller.rejectApplication);
// Officer: Generate marriage certificate PDF
router.post('/:id/generate-certificate', auth, officer, controller.generateCertificate);

// Authenticated file upload for application documents
router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const fileType = req.file.mimetype;
  res.json({ url: fileUrl, type: fileType });
});

// Authenticated: Download/view certificate PDF
router.get('/:id/certificate', auth, async (req, res) => {
  const { id } = req.params;
  const MarriageApplication = require('../models/MarriageApplication');
  const application = await MarriageApplication.findById(id);
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  if (!application.applicant.equals(req.user.userId)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  if (!application.certificateUrl) {
    return res.status(404).json({ message: 'Certificate not generated yet' });
  }
  const filePath = path.join(__dirname, '..', application.certificateUrl);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Certificate file not found' });
  }
  res.download(filePath, `MarriageCertificate-${application._id}.pdf`);
});

module.exports = router; 
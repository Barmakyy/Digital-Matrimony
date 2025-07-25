const MarriageApplication = require('../models/MarriageApplication');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Submit a new marriage application
exports.submitApplication = async (req, res) => {
  try {
    const { spouse1, spouse2, witnesses, documents } = req.body;
    const applicant = req.user.userId;
    const application = new MarriageApplication({
      applicant,
      spouse1,
      spouse2,
      witnesses,
      documents
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all applications for the logged-in user
exports.getMyApplications = async (req, res) => {
  try {
    const applicant = req.user.userId;
    const applications = await MarriageApplication.find({ applicant });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer: Get all pending applications
exports.getPendingApplications = async (req, res) => {
  try {
    const applications = await MarriageApplication.find({ status: 'pending' }).populate('applicant', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer: Approve application
exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledDate } = req.body;
    const application = await MarriageApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    application.status = 'approved';
    application.officer = req.user.userId;
    if (scheduledDate) application.scheduledDate = scheduledDate;
    await application.save();
    res.json({ message: 'Application approved', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer: Reject application
exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await MarriageApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    application.status = 'rejected';
    application.officer = req.user.userId;
    await application.save();
    res.json({ message: 'Application rejected', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer: Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await MarriageApplication.find()
      .populate('applicant', 'name email')
      .populate('officer', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer: Generate marriage certificate PDF
exports.generateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await MarriageApplication.findById(id).populate('applicant', 'name email');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.status !== 'approved') {
      return res.status(400).json({ message: 'Application must be approved to generate certificate' });
    }
    // Use a static congratulatory message
    const aiMessage = 'Congratulations on your marriage! Wishing you a lifetime of love and happiness.';
    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText('Digital Marriage Certificate', { x: 150, y: 350, size: 20, font, color: rgb(0, 0, 0) });
    page.drawText(`Spouse 1: ${application.spouse1.name}`, { x: 50, y: 300, size: 14, font });
    page.drawText(`Spouse 2: ${application.spouse2.name}`, { x: 50, y: 270, size: 14, font });
    page.drawText(`Date of Marriage: ${application.scheduledDate ? application.scheduledDate.toDateString() : 'N/A'}`, { x: 50, y: 240, size: 14, font });
    page.drawText(`Witnesses:`, { x: 50, y: 210, size: 14, font });
    application.witnesses.forEach((w, i) => {
      page.drawText(`- ${w.name}`, { x: 70, y: 190 - i * 20, size: 12, font });
    });
    page.drawText(`Certificate ID: ${application._id}`, { x: 50, y: 100, size: 12, font });
    // Add static congratulatory message
    page.drawText(aiMessage, { x: 50, y: 60, size: 13, font, color: rgb(0.2, 0.2, 0.2) });
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const fileName = `certificate-${application._id}.pdf`;
    const filePath = path.join(__dirname, '../uploads', fileName);
    fs.writeFileSync(filePath, pdfBytes);
    // Update application
    application.certificateUrl = `/uploads/${fileName}`;
    await application.save();
    res.json({ certificateUrl: application.certificateUrl });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 
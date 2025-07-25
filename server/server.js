require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const marriageApplicationRoutes = require('./routes/marriageApplication');
app.use('/api/applications', marriageApplicationRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
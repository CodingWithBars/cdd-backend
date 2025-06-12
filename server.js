require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
const scanHistoryRoutes = require('./routes/scanHistoryRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/scan_history', scanHistoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ API running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });

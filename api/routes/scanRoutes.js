const express = require('express');
const { submitScan } = require('../controllers/scanController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth, submitScan); // Protected

module.exports = router;

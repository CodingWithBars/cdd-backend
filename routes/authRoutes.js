const express = require('express');
const { signup, login, updateUser, deleteUser } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware'); // your JWT middleware
const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.put('/user', authMiddleware, updateUser);
router.delete('/user', authMiddleware, deleteUser);

module.exports = router;

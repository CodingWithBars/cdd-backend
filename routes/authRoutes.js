const express = require('express');
const {
  signup,
  login,
  updateUser,
  deleteUser
} = require('../controllers/authControllers'); // ✅ goes up to parent, then into controllers

const auth = require('../middleware/authMiddleware'); // ✅ goes up to parent, then into middleware

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.put('/user', auth, updateUser);
router.delete('/user', auth, deleteUser);

module.exports = router;





// const express = require('express');
// const { signup, login } = require('../controllers/authControllers');
// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const { signup, login } = require('../controllers/authControllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;




// const express = require('express');
// const { signup, login, updateUser, deleteUser } = require('../controllers/authControllers');
// const auth = require('../middlewares/authMiddleware'); // your JWT middleware
// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/login', login);

// // Protected routes
// router.put('/user', auth, updateUser);
// router.delete('/user', auth, deleteUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/authentication');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', authenticateUser, currentUser);

module.exports = router;
const express = require('express');
const { registerUser, loginUser, makePayment } = require('../controllers/paymentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/make-payment', authMiddleware, makePayment);

module.exports = router;

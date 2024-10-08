const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const ExpressBrute = require('express-brute');

const bruteStore = new ExpressBrute.MemoryStore(); // Use a proper store (Redis, etc.) for production
const bruteforce = new ExpressBrute(bruteStore);

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'mhgPaymentSecretKey';

// Register a new user
exports.registerUser = async (req, res) => {
    // Validation rules
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage('Password must be 8 characters long and contain at least one letter and one number'),
    body('phoneNumber').matches(/^\+?(\d.*){10,}$/).withMessage('Phone number is invalid'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, idNumber, accountNumber, password, email, phoneNumber } = req.body;
        try {
            const newUser = new User({ fullName, idNumber, accountNumber, password, email, phoneNumber });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

// // Login route with brute force protection and validation
exports.loginUser = async (req, res) => {
    // Brute force protection
    bruteforce.prevent,

    // Input validation
    body('accountNumber').isNumeric().withMessage('Account number must be numeric'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { accountNumber, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ accountNumber });
            if (!user) {
                return res.status(401).json({ message: 'Invalid account number or password' });
            }

            // Compare the password with the hashed one
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid account number or password' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id, accountNumber: user.accountNumber }, JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

// Make Payment (authenticated)
exports.makePayment = async (req, res) => {
    const { amount, currency, provider, swiftCode, payeeAccount } = req.body;
    try {
        // Process payment logic here
        res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

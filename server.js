const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/payment');
const cors = require('cors');

const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();  // Stores in memory (you can use Redis or other stores for production)

const bruteforce = new ExpressBrute(store);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));  // Logs all HTTP requests
app.use(limiter);

// Routes
app.use('/api/payments', paymentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

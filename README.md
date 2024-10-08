README FILE 

# International Payment System
This project is an internal international payment system for a bank, where customers can register, log in, and make international payments via the bank’s online portal. Employees can access the payment portal to verify and process the transactions via SWIFT. The system focuses on secure handling of sensitive customer data, ensuring password security and preventing common attacks.

# Project Structure
The project consists of two main parts:

Frontend: A React-based user interface for customers to register, log in, and make payments. Backend: An Express.js-based API server that handles authentication, payment processing, and storing transaction data.

# Prerequisites
Ensure you have the following installed:

Node.js (v14 or above) npm (Node Package Manager) or yarn MongoDB (for storing user and payment information) Ensure that you have a MongoDB database running locally or in the cloud (e.g., MongoDB Atlas) and have its connection string ready.

# Setup Instructions
Clone the Repository
Install Dependencies

# Features
Customer Registration & Login:

Full name, ID number, account number, and password are required. Passwords are securely hashed and salted. Making Payments:

Customers can enter payment details, choose a currency, and provide the SWIFT code of the payee. Employee Verification:

Pre-registered employees can log in to verify customer transactions and forward them to SWIFT. Security:

Password hashing and salting. Input validation using RegEx for secure data entry. Rate limiting, brute force protection, and SSL.

# Security Measures
Password Security: Passwords are hashed and salted using bcrypt. Input Validation: Inputs are validated using RegEx patterns to prevent injection attacks. Rate Limiting: Implemented using express-rate-limit to prevent brute force attacks. Brute Force Protection: Included with express-brute to block repeated attempts. SSL: Ensure all traffic is served over HTTPS.

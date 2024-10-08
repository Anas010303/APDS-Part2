import { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Login() {
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Form submitted!");
        try {
            const res = await axios.post('http://localhost:5000/api/payments/login', { accountNumber, password });
            //localStorage.setItem('token', response.data.token);
            alert('Login successful');
            localStorage.setItem('token', res.data.token); // Store JWT token in local storage
        } catch (error) {
            alert('Login failed: '+ error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;

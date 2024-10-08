import { useState } from 'react';
import axios from 'axios';
import './styles.css';

function PaymentForm() {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [provider, setProvider] = useState('SWIFT');
    const [payeeAccount, setPayeeAccount] = useState('');
    const [swiftCode, setSwiftCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Form submitted!");
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/payments/make-payment', { amount, currency, provider, payeeAccount, swiftCode }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Payment successful');
        } catch (error) {
            alert('Payment failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            <input type="text" placeholder="Payee Account" value={payeeAccount} onChange={(e) => setPayeeAccount(e.target.value)} />
            <input type="text" placeholder="SWIFT Code" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} />
            required
            <button type="submit">Submit Payment</button>
        </form>
    );
}

export default PaymentForm;

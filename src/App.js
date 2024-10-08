import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PaymentForm from './components/PaymentForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/make-payment" element={<PaymentForm />} />
            </Routes>
        </Router>
    );
}

export default App;

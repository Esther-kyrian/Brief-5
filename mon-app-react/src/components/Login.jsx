import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            onLogin(token);
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>             
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function App() {
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem('token');
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return null;
        }
    });

    const handleLogin = (newToken) => {
        setToken(newToken);
        try{
            localStorage.setItem('token', newToken);
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }

    };

    const handleLogout = () => {
        setToken(null);
        try{
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Error removing localStorage:", error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                setToken(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/tasks"
                    element={token ? <TaskList onLogout={handleLogout} /> : <Navigate replace to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
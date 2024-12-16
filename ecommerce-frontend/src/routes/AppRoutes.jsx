import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register'element={<RegistrationPage />} />
                <Route
                path="/dashboard"
                element={isAuthenticated ? <DashboardPage /> : <Navigate to='/login'/> } 
                />
                <Route path='*' element={ <Navigate to='/login' /> } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

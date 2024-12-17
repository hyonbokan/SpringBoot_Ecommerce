import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout>
                            <HomePage />
                        </Layout> 
                } />
                <Route 
                    path='/login' 
                    element={
                        <Layout>
                            <LoginPage />
                        </Layout>
                } />
                <Route
                    path='/register'
                    element={
                        <Layout>
                            <RegistrationPage />
                        </Layout> 
                }/>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout>
                                <DashboardPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path='*' element={ <Navigate to='/login' replace /> } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import CartPage from '../pages/CartPage'
import ProductDetailPage from '../pages/ProductDetailPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';

const AppRoutes = ({ cart = [], totalCartQuantity, addToCart, removeFromCart, clearCart, handleLogout }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <HomePage addToCart={addToCart} />
                        </Layout>
                } />
                <Route 
                    path='/login' 
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <LoginPage />
                        </Layout>
                } />
                <Route
                    path='/register'
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <RegistrationPage />
                        </Layout>
                }/>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                                <DashboardPage cart={cart} removeFromCart={removeFromCart} />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/cart'
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
                        </Layout>
                    }
                />
                <Route
                    path='/products/:id'
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <ProductDetailPage addToCart={addToCart} />
                        </Layout>
                    }
                />
                <Route
                    path="/order-confirmation/:id"
                    element={
                        <Layout totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}>
                            <OrderConfirmationPage />
                        </Layout>
                    }
                />
                <Route
                    path='*'
                    element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

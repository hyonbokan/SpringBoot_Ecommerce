import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import apiClient from '../api/apiClient';

const LoginPage = () => {
    const [sucess, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token, roles } = response.data;

            // save token and roles in local store
            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles));
            setSuccess(true);
            setError('');

            
            window.location.href = 'dashboard';
        } catch (error) {
            setError(`Login failed. Error: ${error}`);
        }
    };

    return (
        <Box sx={{ width: 300, margin: 'auto', mt: 10 }}>
            <Typography variant='h4' align='center' gutterBottom>
                Login
            </Typography>
            {sucess && <Alert security='success'>Login successful</Alert>}
            {error && <Alert severity='error'>{error}</Alert>}
            <form onSubmit={handleLogin}>
                <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin='normal'
                />
                <TextField
                    label='Password'
                    type='password'
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin='normal'
                />
                <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
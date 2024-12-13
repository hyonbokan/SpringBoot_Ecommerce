import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import apiClient from '../api/apiClient';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token, roles } = response.data;

            // save token and roles in local store
            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles));

            alert('Login successful');
            window.location.href = 'dashboard';
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <Box sx={{ width: 300, margin: 'auto', mt: 10 }}>
            <Typography variant='h4' align='center' gutterBottom>
                Login
            </Typography>
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
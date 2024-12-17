import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import apiClient from '../api/apiClient';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiClient.post('auth/register', formData);
            setSuccess(true);
            setError('');
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            console.log(err.response?.data.password)
            setError(err.response?.data?.password || 'Registration failed. Please try again.');
        }
    };


    return (
        <Box sx={{ width: 400, margin: 'auto', mt: 10 }}>
            <Typography variant='h4' gutterBottom align='center'>
                Register
            </Typography>
            {success && <Alert severity='success'>Registration is successful! Please log in.</Alert>}
            {error && <Alert severity='error'>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    required
                />
                <TextField
                    label='Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    required
                />
                <TextField
                    label='Password'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    required
                />
                <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
                    Register
                </Button>
            </form>
        </Box>
    );
}

export default RegistrationPage;
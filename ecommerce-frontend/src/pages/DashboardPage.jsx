import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import apiClient from '../api/apiClient';


const DashboardPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await apiClient.get('/orders', {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
            <Typography variant='h4' gutterBottom>
                My Orders
            </Typography>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <ListItemText 
                            primary={`Order #${order.id}`}
                            secondary={`Total: $${order.totalPrice} - Status: ${order.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default DashboardPage;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Button } from '@mui/material';
import apiClient from '../api/apiClient';

const OrderConfirmationPage = () => {
    const { id } = useParams(); // Get the order ID from the route parameter
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the order details based on the ID
    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get(`/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // console.log(response.data);
                setOrder(response.data);
            } catch (err) {
                setError(`Failed to fetch order details: ${err}. Please try again later.`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    // Show loading spinner while data is being fetched
    if (loading) return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 10 }} />;

    // Show error alert if there was an issue fetching the data
    if (error) return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Order Confirmation
            </Typography>

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6">
                    Order ID: {order.id}
                </Typography>
                <Typography variant="h6">
                    Status: {order.status}
                </Typography>
                <Typography variant="h6">
                    Total Price: ${order.totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="h6">
                    Order Date: {new Date(order.createdDate).toLocaleDateString()}
                </Typography>
            </Box>

            <Typography variant="h5" sx={{ marginTop: 4 }}>
                Order Items
            </Typography>
            <List>
                {order?.items?.length > 0 ? (
                    order.items.map((item) => (
                        <ListItem key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <ListItemText
                                primary={item.productName || 'Unnamed Product'}
                                secondary={
                                    `Quantity: ${item.quantity || 0} | Price: $${item.price.toFixed(2)}`
                                }
                            />
                        </ListItem>
                ))
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No items in the order.
                </Typography>
            )}
            </List>

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    );
};

export default OrderConfirmationPage;
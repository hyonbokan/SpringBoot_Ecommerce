import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import apiClient from '../api/apiClient';

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You are not authorized. Please log in.');
                    setLoading(false);
                    return;
                }

                const response = await apiClient.get(`/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrder(response.data);
            } catch (err) {
                setError(`Failed to fetch order details: ${err} Please try again later.`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleCompleteOrder = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must log in to complete the order.');
            return;
        }

        const transactionData = {
            transactionId: '123456789', // Mock transaction ID
            status: 'SUCCESS', // Mock status
        };

        try {
            const response = await apiClient.post(`/orders/${id}/complete`, transactionData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccessMessage('Order completed successfully!');
            setOrder(response.data); // Update the order details with the new status
        } catch (err) {
            setError('Failed to complete the order. Please try again later.');
        }
    };

    if (loading) return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 10 }} />;

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Order Confirmation
            </Typography>

            {successMessage && <Alert severity="success" sx={{ mb: 4 }}>{successMessage}</Alert>}

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="h6">Status: {order.status}</Typography>
                <Typography variant="h6">Total Price: ${order.totalPrice.toFixed(2)}</Typography>
                <Typography variant="h6">Order Date: {new Date(order.createdDate).toLocaleDateString()}</Typography>
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

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {order?.status === 'PENDING' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCompleteOrder}
                        sx={{ 
                            fontWeight: 'bold',
                            textTransform: 'none',
                            paddingX: 4,
                        }}
                    >
                        Complete Order
                    </Button>
                )}
                <Button 
                    variant="contained" 
                    color="secondary" 
                    component={Link} to="/"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        paddingX: 4
                    }}
                    >
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    );
};

export default OrderConfirmationPage;
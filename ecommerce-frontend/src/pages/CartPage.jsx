import { React, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const CartPage = ({ cart, removeFromCart, clearCart }) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    
    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You must log in to checkout.");
            return;
        }

        // transform cart to match the expected backend payload
        const orderItems = cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        }));

        try {
            const response = await apiClient.post('/orders/checkout', orderItems, {
                headers: { Authorization: `Bearer ${token}`},
            });
            setSuccess('Order placed successfully!');
            clearCart();
            navigate(`/order-confirmation/${response.data.id}`);
        } catch (err) {
            setError(`Failed to process checkout: ${err}.\nPlease try again.`);
        }
        
    }

    if (cart.length === 0) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h5" align="center">
                    Your cart is empty.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Shopping Cart
            </Typography>

            {success && (
                <Alert severity='success' sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <List>
                {cart.map((item) => (
                    <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, }}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`}
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '60%'
                            }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ 
                                width: 95, 
                                height: 30, 
                                flexShrink: 0 // prevent overshinking
                            }}
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ textAlign: 'right', mt: 2}}>
                <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                    Total: $
                    {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
                {/* Check out button */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCheckout}
                    sx={{ mt: 2 }}
                    disabled={cart.length === 0}
                >
                    Check out
                </Button>
            </Box>
        </Box>
    );
};

export default CartPage;

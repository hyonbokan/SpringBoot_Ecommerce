import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const CartPage = ({ cart, removeFromCart }) => {
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
            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                Total: $
                {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
        </Box>
    );
};

export default CartPage;

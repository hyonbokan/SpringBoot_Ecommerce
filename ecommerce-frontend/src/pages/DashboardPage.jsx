import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableHead, TableRow, CircularProgress, Alert, TableCell, Button } from '@mui/material';
import apiClient from '../api/apiClient';


const DashboardPage = ({ cart, removeFromCart }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not authorized. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get('/orders', {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setOrders(response.data);
            } catch (error) {
                setError(`Failed to fetch orders: ${error} Please try again.`);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <CircularProgress />;

    if (error) return <Alert severity='error'>{ error }</Alert>

    return (
        <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            {/* <List>
                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <ListItemText 
                            primary={`Order #${order.id}`}
                            secondary={`Total: $${order.totalPrice} - Status: ${order.status}`}
                        />
                    </ListItem>
                ))}
            </List> */}

            {/* cart section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant='h5' gutterBottom>
                    My Cart
                </Typography>
                {cart.length > 0 ? (
                    <Table sx={{ mt: 2, boxShadow: 3 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Typography>No items in the cart.</Typography>
                )}
            </Box>

            {/* orders section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant='h5' gutterBottom>
                    My Orders
                </Typography>
                {orders.length > 0 ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{new Date(order.createdDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Typography>No orders found</Typography>
                )}
            </Box>
        </Box>
    );
};

export default DashboardPage;
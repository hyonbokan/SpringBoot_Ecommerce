import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';


const Navbar = ({ totalCartQuantity }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    const hadnleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        // localStorage.removeItem('cart')
        window.location.href = '/login';
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/" sx={{ textTransform: 'none' }}>
                        E-commerce App
                    </Button>
                </Typography>

                <Button color="inherit" href="/">Home</Button>
                { !isAuthenticated && (
                    <>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/register">Register</Button>
                    </>
                )}
                { isAuthenticated && (
                    <>
                        <Button color="inherit" href="/dashboard">Dashboard</Button>
                        <Button color="inherit" href="/cart">
                            Cart
                            <Badge color="secondary" badgeContent={totalCartQuantity} showZero>
                                🛒
                            </Badge>
                        </Button>
                        <Button color="inherit" onClick={hadnleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
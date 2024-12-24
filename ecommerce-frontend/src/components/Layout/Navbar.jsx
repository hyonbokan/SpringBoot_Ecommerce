import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';


const Navbar = ({ totalCartQuantity, handleLogout}) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/" sx={{ textTransform: 'none', fontSize: '1em' }}>
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
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
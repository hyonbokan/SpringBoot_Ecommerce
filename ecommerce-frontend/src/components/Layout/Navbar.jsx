import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const hadnleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        window.location.href = '/login';
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    E-commerce App
                </Typography>
                { !isAuthenticated && (
                    <>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/register">Register</Button>
                    </>
                )}
                { isAuthenticated && (
                    <>
                        <Button color="inherit" href="/dashboard">Dashboard</Button>
                        <Button color="inherit" onClick={hadnleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
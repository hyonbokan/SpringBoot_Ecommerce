import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    E-commerce App
                </Typography>
                <Button color="inherit" href="/login">Login</Button>
                <Button color="inherit" href="/dashboard">Dashboard</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
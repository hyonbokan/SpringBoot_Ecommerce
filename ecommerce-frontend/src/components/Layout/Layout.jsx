import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children, totalCartQuantity, handleLogout }) => {
    return (
        <>
            <Navbar totalCartQuantity={totalCartQuantity} handleLogout={handleLogout}/>
            <Box
                sx={{
                    minHeight: 'calc(100vh - 120px)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ flex: 1 }}>
                    { children }
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Layout;
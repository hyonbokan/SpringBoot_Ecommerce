import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                textAlign: 'center',
                mt: 4,
                bgcolor: 'primary.main',
                color: 'white',
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} E-commerce App. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default Footer;

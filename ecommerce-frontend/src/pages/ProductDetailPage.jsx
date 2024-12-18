import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia, CircularProgress, Alert } from '@mui/material';
import apiClient from '../api/apiClient';

const ProductDetailPage = ({ addToCart }) => {
    const { id } = useParams(); // what is it
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
            const loadDetail = async () => {
                setLoading(true);
                try {
                    const response = await apiClient.get(`products/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    setError('Error fetching products: ', error)
                } finally {
                    setLoading(false);
                }
            }

            loadDetail();
        }, [id]
    )

    if (loading) return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 10 }}/>;

    if (error) return <Alert security='error'>{error}</Alert>

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box sx={{ flex: '1 1 40%' }}>
                    <CardMedia 
                        component='img'
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{ width: '100%', height: '400px', objectFit: 'contain', boxShadow: 3 }}
                    />
                </Box>

                {/* product detail */}
                <Box sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant='body1' sx={{ color: 'text.seconday' }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Stock: {product.stockQuantity > 0 ? product.stockQuantity : 'Out of Stock'}
                    </Typography>

                    {/* add to card button */}
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        disabled={product.stockQuantity === 0}
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    )


}

export default ProductDetailPage;
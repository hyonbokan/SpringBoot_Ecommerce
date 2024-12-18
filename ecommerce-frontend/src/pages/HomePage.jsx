import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Alert,
    CardActions,
    Button,
    Pagination
} from '@mui/material';
import { fetchProducts } from '../api/productService';

const HomePage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);

    useEffect(
        () => {
            const loadProducts = async () => {
                setLoading(true);
                try {
                    const data = await fetchProducts(currentPage, 12);
                    setProducts(data.content);
                    setTotalPage(data.totalPages);
                } catch (error) {
                    setError(`Failed to load products:  ${error} Please try again.`);
                } finally {
                    setLoading(false);
                }
            };

            loadProducts();
        }, [currentPage]  // reload products when currentPage changes
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    }

    if (loading) return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 10 }} />;

    if (error) return <Alert severity='error'>{error}</Alert>;

    return (
        <>
            <Box sx={{ width: '95%', margin: 'auto', mt: 4}}>
                <Typography variant='h4' gutterBottom align="center" sx={{ mb: 4 }}>
                    All Products
                </Typography>
                {/* products */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {products.map((product) => (
                        <Card 
                            key={product.id}
                            sx={{ 
                                width: 'calc(25% - 16px)', // 4 cards in a row with 16px spacing
                                minWidth: '240px', // Minimum width for small screens
                                height: 400, // fixed height
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 3,
                                borderRadius: 2,
                                overflow: 'hidden',
                            }}>
                            <CardMedia
                                component='img'
                                image={product.imageUrl}
                                alt={product.name}
                                sx={{ 
                                    height: 180,
                                    objectFit: 'contain',
                                    padding: 1,
                                    // backgroundColor: '#f8f9fa',
                                }}
                            />
                            <CardContent
                                sx={{
                                    flex: 1, //take up remaining space
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {/* title */}
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '100%',
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                
                                {/* description */}
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{
                                        textAlign: 'left',
                                        height: '50px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        mt: 1,
                                    }}
                                >
                                    {
                                        product.description.length > 100
                                            ? product.description.slice(0,100) + '...'
                                            : product.description
                                    }
                                </Typography>

                                {/* Price */}
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    sx={{
                                        fontWeight: 'bold',
                                        mt: 1,
                                        height: '5px'
                                    }}
                                >
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                            
                            <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                                {/* detail action button */}
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', width: '48%' }}>
                                    <Button 
                                        variant='contained' 
                                        color='primary'
                                        sx={{
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            minWidth: 100, // Allow the button to expand
                                            height: 40, // Consistent height
                                            padding: '0 16px', // Add horizontal padding for text
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Link>
                                {/* cart button */}
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => addToCart(product)}
                                    sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        minWidth: 100, // Allow the button to expand
                                        height: 40, // Consistent height
                                        padding: '0 16px', // Add horizontal padding for text
                                        flexShrink: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4}}>
                    <Pagination 
                        count={totalPages}
                        page={currentPage + 1}
                        onChange={handlePageChange}
                        color='primary'
                        size='large'
                        fullWidth
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default HomePage;
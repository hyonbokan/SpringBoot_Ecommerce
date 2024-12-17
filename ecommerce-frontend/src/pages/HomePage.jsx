import React, { useEffect, useState } from 'react';
import { 
    Grid2,
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

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(currentPage);
                setProducts(data.content);
                setTotalPage(data.totalPages);
            } catch (error) {
                console.log('Error fetching products: ', error);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [currentPage]); // reload products when currentPage changes

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    }

    if (loading) return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 10 }} />;

    if (error) return <Alert severity='error' sx={{ mt: 4 }}>{error}</Alert>;

    return (
        <>
            <Box sx={{ width: '95%', margin: 'auto', mt: 4}}>
                <Typography variant='h4' gutterBottom align="center" sx={{ mb: 4 }}>
                    All Products
                </Typography>
                {/* products */}
                <Grid2 container spacing={3} justifyContent='center'>
                    {products.map((product) => (
                    <Grid2 item size={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: 4,
                            borderRadius: 2,
                            }}>
                            <CardMedia
                                component='img'
                                image={product.imageUrl}
                                alt={product.name}
                                sx={{ 
                                    height: 200,
                                    objectFit: 'contain',
                                    padding: 1,
                                    // backgroundColor: '#f8f9fa',
                                }}
                            />
                            <CardContent>
                                <Typography 
                                variant='h6'
                                align='center'
                                sx={{ mb: 1, fontWeight: 'bold' }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{ textAlign: 'center', mb: 2, height: '50px', overflow: 'hidden' }}
                                >
                                    {
                                        product.description.length > 100
                                            ? product.description.slice(0,100) + '...'
                                            : product.description
                                    }
                                </Typography>
                                <Typography variant='h6' color='primary'>
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ mt: 'auto' }}>
                                <Button 
                                    size='medium' 
                                    variant='contained' 
                                    color='primary' 
                                    fullWidth
                                    sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>   
                    ))}
                </Grid2>

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
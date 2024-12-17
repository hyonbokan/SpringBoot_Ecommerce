import apiClient from "./apiClient";

// fetch all products
export const fetchProducts = async (page = 0, size = 10) => {
    try {
        const response = await apiClient.get('/products', { 
            params: {page, size} 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        throw error;
    }

}
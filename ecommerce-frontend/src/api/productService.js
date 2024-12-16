import apiClient from "./apiClient";

// fetch all products
export const fetchProducts = async (filters = {}) => {
    const response = await apiClient.get('/products', { params: filters });
    return response.data;
}
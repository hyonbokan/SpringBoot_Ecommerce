package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Retrive all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // add new product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }


}

package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String keyword);

    List<Product> findByPriceBetweenAndStockQuantityGreaterThanEqual(Double minPrice, Double maxPrice, Integer minStock);

//    Page<Product> findAll(Pageable pageable);

}

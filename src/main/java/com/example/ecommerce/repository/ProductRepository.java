package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String keyword);

    List<Product> findByPriceBetweenAndStockQuantityGreaterThanEqual(Double minPrice, Double maxPrice, Integer minStock);

//    Page<Product> findAll(Pageable pageable);
    // Allows null values for minPrice or maxPrice to make these parameters optional.
    @Query("SELECT p from Product p WHERE " +
            "(:keyword IS NULL or LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:minPrice IS NULL or p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL or p.price <= :maxPrice)")
    Page<Product> findBySearchAndFilters(
            @Param("keyword") String keyword,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
            );

}

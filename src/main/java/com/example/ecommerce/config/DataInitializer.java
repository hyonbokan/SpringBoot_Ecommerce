package com.example.ecommerce.config;

import com.example.ecommerce.entity.FakeStoreProduct;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Arrays;

@Component
public class DataInitializer implements ApplicationRunner {

    private final UserService userService;
    private final ProductRepository productRepository;

    public DataInitializer(UserService userService, ProductRepository productRepository) {
        this.userService = userService;
        this.productRepository = productRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        initializeProducts();
        initializeAdminUser();
        initializeUser();
    }

    private void initializeAdminUser() {
        String adminEmail = "admin@example.com";
        String adminPassword = "AdminPassword123";

        // check if the default admin user exists
        if (userService.getUserByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Default Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(adminPassword);
            userService.registerUser(admin, true);
            System.out.println("Default admins created: " + adminEmail + " / " + adminPassword);
        } else {
            System.out.println("Default admin already exists.");
        }
    }

    private void initializeUser() {
        String email = "johnSmith@gmail.com";
        String password = "!Password123";

        if (userService.getUserByEmail(email).isEmpty()) {
            User defaultUser = new User();
            defaultUser.setName("John Smith");
            defaultUser.setEmail(email);
            defaultUser.setPassword(password);
            userService.registerUser(defaultUser, false);
            System.out.println("Default user created: " + email + " / " + password);
        } else {
            System.out.println("Default user already exists.");
        }
    }
    
    private void initializeProducts() {
        if (productRepository.count() > 0) {
            System.out.println("Products already initialized.");
            return;
        }

        System.out.println("Fetching products from API...");
        String apiUrl = "https://fakestoreapi.com/products";
        RestTemplate restTemplate = new RestTemplate();


        try{
            // fetch product from the API
            ResponseEntity<FakeStoreProduct[]> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                FakeStoreProduct[].class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Product> products = Arrays.stream(response.getBody())
                .map(apiProduct -> {
                    Product product = new Product();
                    product.setName(apiProduct.getTitle());
                    product.setDescription(apiProduct.getDescription());
                    product.setPrice(apiProduct.getPrice());
                    product.setImageUrl(apiProduct.getImage());
                    product.setCategory(apiProduct.getCategory());
                    product.setStockQuantity(50); // default
                    return product;
                }).toList();
                productRepository.saveAll(products);
                System.out.println("Products initialized successfully!");
            }
            
        } catch (Exception e) {
            System.out.println("Error initializing products: " + e.getMessage());
        }
    }

}

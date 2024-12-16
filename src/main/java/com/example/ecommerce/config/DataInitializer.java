package com.example.ecommerce.config;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

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
    
    private void initializeProducts() {
        if (productRepository.count() > 0) {
            System.out.println("Products already initialized.");
            return;
        }

        System.out.println("Fetching products from API...");
        String apiUrl = "https://fakestoreapi.com/products";
        RestTemplate restTemplate = new RestTemplate();



        try{

        } catch (Exception e) {
            System.out.println("Error initializing products: " + e.getMessage());
        }
    }

}

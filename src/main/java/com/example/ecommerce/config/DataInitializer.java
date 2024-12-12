package com.example.ecommerce.config;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private final UserService userService;

    public DataInitializer(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
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

}

package com.example.ecommerce.controller;

import com.example.ecommerce.service.AuthenticationService;
import com.example.ecommerce.service.UserService;
import com.example.ecommerce.util.JwtUtil;
import com.example.ecommerce.dto.LoginResponse;
import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtUtil jwtUtil;

    public AuthenticationController(AuthenticationService authenticationService, JwtUtil jwtUtil) {
        this.authenticationService = authenticationService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            //auth user
            User user = authenticationService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            String token = jwtUtil.generateToken(user.getEmail());

            LoginResponse response = new LoginResponse(token, user.getRoles());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
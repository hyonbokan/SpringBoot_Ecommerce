package com.example.ecommerce.controller;

import com.example.ecommerce.service.AuthenticationService;
import com.example.ecommerce.util.JwtUtil;
import com.example.ecommerce.dto.LoginResponse;
import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
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

            // convert roles to a list of strings
            List<String> roles = user.getRoles().stream().collect(Collectors.toList());

            String token = jwtUtil.generateToken(user.getEmail(), roles);

            LoginResponse response = new LoginResponse(token, roles);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
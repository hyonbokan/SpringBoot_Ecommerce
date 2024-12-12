package com.example.ecommerce.dto;

import java.util.Set;

public class LoginResponse {

    private String token;
    private Set<String> roles;

    public LoginResponse(String token, Set<String> roles) {
        this.token = token;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public Set<String> getRoles() {
        return roles;
    }
}

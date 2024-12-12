package com.example.ecommerce.dto;

import java.util.Set;

public class UserDTO {
    private final Long id;
    private String name;
    private String email;
    private Set<String> roles;

    public UserDTO(Long id, String name, String email, Set<String> roles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}

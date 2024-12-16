package com.example.ecommerce.controller;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.service.OrderService;
import com.example.ecommerce.service.UserService;
import com.example.ecommerce.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
// import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, UserService userService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder (
            @RequestHeader("Authorization") String token,
            @RequestBody List<OrderItem> items) {
        // extract the email from the jwt token
        String email = jwtUtil.validateToken(token.substring(7)); // Remove "Bearer"

        // fetch the user and proceed with order creation
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderService.createOrder(user, items);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Principal principal) {        
        // System.out.println("Principal: " + principal.getName());
        // System.out.println("Authorities: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        String email = principal.getName();
        List<Order> orders = orderService.getOrdersByEmail(email);
        return ResponseEntity.ok(orders);
    }
}

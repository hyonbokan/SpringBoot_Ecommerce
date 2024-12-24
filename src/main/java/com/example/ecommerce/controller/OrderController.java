package com.example.ecommerce.controller;

import com.example.ecommerce.dto.OrderDTO;
import com.example.ecommerce.entity.*;
import com.example.ecommerce.service.OrderService;
import com.example.ecommerce.service.UserService;
import com.example.ecommerce.util.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import java.security.Principal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



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
    
    @PostMapping("/checkout")
    public ResponseEntity<?> createOrder (
            @RequestHeader("Authorization") String token,
            @RequestBody List<OrderItem> items
            ) {
        try {
        // extract the email from the jwt token
        String email = jwtUtil.validateToken(token.substring(7));

        // fetch the user and proceed with order creation
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = orderService.createOrder(user, items);

        OrderDTO orderDTO = OrderService.tOrderDTO(order);
        return ResponseEntity.ok(orderDTO);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred during checkout.");
        }
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getUserOrders(Principal principal) {        
        String email = principal.getName();
        List<Order> orders = orderService.getOrdersByEmail(email);
        List<OrderDTO> orderDTOs = orders.stream()
            .map(OrderService::tOrderDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @PostMapping("/{orderId}/complete")
    public ResponseEntity<?> completeOrder(
        @PathVariable Long orderId,
        @RequestHeader("Authorization") String token,
        @RequestBody Map<String, Object> transactionData
    ) {
        try {
            // email from jwt token
            String email = jwtUtil.validateToken(token.substring(7));

            // fetch user
            User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));
            
            // complete order
            Order order = orderService.completeOrder(orderId, user, transactionData);

            // convert to DTO
            OrderDTO orderDTO = OrderService.tOrderDTO(order);
            return ResponseEntity.ok(orderDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occured");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
        @PathVariable Long id, 
        @RequestHeader("Authorization") String token
        ) {
            try {
                String email = jwtUtil.validateToken(token.substring(7));
                User user = userService.getUserByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                Order order = orderService.getOrderByIdAndUser(id, user);
                return ResponseEntity.ok(OrderService.tOrderDTO(order));
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred.");
            }
    }
    
}
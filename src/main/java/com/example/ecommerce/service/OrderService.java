package com.example.ecommerce.service;

import com.example.ecommerce.dto.OrderDTO;
import com.example.ecommerce.dto.OrderItemDTO;
import com.example.ecommerce.entity.*;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(User user, List<OrderItem> items) {
        double totalPrice = 0.0;

        for (OrderItem item : items) {
            // 1. convert item.productId to Product
            Long productId = item.getProductId();
            if (productId == null) {
                throw new RuntimeException("Missing product Id in OrderItem");
            }
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found" + productId));
            
            // 2. Set Product in the item
            item.setProduct(product);

            // 3. Check stock
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // 4. calc item price and reduce stock
            double itemPrice = product.getPrice() * item.getQuantity();
            item.setPrice(itemPrice);
            
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);

            totalPrice += item.getPrice();
        }

        // create the order
        Order order = new Order();
        order.setUser(user);
        order.setItems(items);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedDate(new Date());

        // link items to the order
        items.forEach(item -> item.setOrder(order));

        return orderRepository.save(order);
    }

    public Order getOrderByIdAndUser(Long orderId, User user) {
        return orderRepository.findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found or access denied."));
    }    

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }

    private boolean verifyTransaction(Map<String, Object> transactionData) {
        // sim transaction
        if (transactionData.containsKey("transactionId") && transactionData.containsKey("status")) {
            return "SUCCESS".equalsIgnoreCase(transactionData.get("status").toString());
        }
        return false;
    }

    public Order completeOrder(Long orderId, User user, Map<String, Object> transactionData) {        
        if(!verifyTransaction(transactionData)) {
            throw new RuntimeException("Transaction failed. Order cannot be completed.");
        }

        // fetch order
        Order order = orderRepository.findByIdAndUser(orderId, user)
            .orElseThrow(() -> new RuntimeException("Order not found."));
        
        // mark as complete
        order.setStatus(OrderStatus.COMPLETED);
        return orderRepository.save(order);
    }

    public static OrderDTO tOrderDTO(Order order) {
        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(OrderService::tOrderItemDTO)
                .collect(Collectors.toList());

        return new OrderDTO(
            order.getId(),
            order.getTotalPrice(),
            order.getStatus().name(), // convert enum to string
            order.getCreatedDate(),
            itemDTOs
        );
    }

    public static OrderItemDTO tOrderItemDTO(OrderItem item) {
        return new OrderItemDTO(
            item.getId(),
            item.getProduct().getId(),
            item.getProduct().getName(),
            item.getQuantity(),
            item.getPrice()
        );
    }
}

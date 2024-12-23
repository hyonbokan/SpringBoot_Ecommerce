package com.example.ecommerce.service;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }
}

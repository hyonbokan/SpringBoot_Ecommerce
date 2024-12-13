package com.example.ecommerce.entity;

import com.example.ecommerce.enums.OrderStatus;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Defines a relationship where many instances of the current entity (e.g., Order) can be associated with one instance of another entity (e.g., User).
    @JoinColumn(name = "user_id", nullable = false) // Specifies the name of the foreign key column in the table (e.g., user_id, order_id, product_id).
    private User user;

    // Defines a relationship where one instance of the current entity (e.g., Order) can be associated with many instances of another entity (e.g., OrderItem).
    // mappedBy = "order":
    //Specifies the field in the OrderItem entity that maps the relationship.
    //cascade = CascadeType.ALL:
    //Propagates operations (e.g., save, delete) performed on the parent entity (Order) to its children (OrderItem).
    //orphanRemoval = true:
    //Automatically removes OrderItem records that are no longer associated with an Order.
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    // Specifies the date/time type for a Date field.
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}

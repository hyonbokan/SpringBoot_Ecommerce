package com.example.ecommerce.dto;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;
    private Double totalPrice;
    private String status;
    private Date createdDate;
    private List<OrderItemDTO> items;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(Long id, Double totalPrice, String status, Date createdDate, List<OrderItemDTO> items) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdDate = createdDate;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setProductId(Long id) {
        this.id = id;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}

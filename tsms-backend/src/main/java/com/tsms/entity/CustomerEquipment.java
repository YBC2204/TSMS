package com.tsms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Entity
@Table(name = "customer_equipment")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CustomerEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JoinColumn(name = "customer_id", nullable = false)
    private Long customerId;

    @NotBlank(message = "Equipment name is required")
    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}

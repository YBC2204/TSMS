package com.tsms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "stock")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Stock item name is required")
    @Column(name = "stock_item", nullable = false)
    private String stockItem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "brand_id")
    private LookupCategory brand;

    @Column(name = "si_number")
    private String siNumber;

    @Column(name = "status")
    private String status;
}

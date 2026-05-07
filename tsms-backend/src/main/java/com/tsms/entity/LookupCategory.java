package com.tsms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lookup_category")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LookupCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "lookup_type", nullable = false)
    private String lookupType; // "CUSTOMER_CATEGORY", "JOB_POSITION", "BRAND", "STOCK_STATUS"

    @Column(name = "is_active")
    private Boolean isActive = true;
}

package com.tsms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @NotBlank(message = "Customer name is required")
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Email(message = "Invalid email format")
    @Column(name = "email_id")
    private String emailId;

    @Column(name = "contact_person")
    private String contactPerson;

    @NotBlank(message = "Mobile number is required")
    @Column(name = "mobile_no", nullable = false)
    private String mobileNo;

    @Column(name = "alternative_mob_no")
    private String alternativeMobNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private LookupCategory category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private LookupCategory branch;

    @Column(name = "nearest_landmark")
    private String nearestLandmark;

    @Column(name = "distance")
    private Double distance;

    @OneToMany(mappedBy = "customerId", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CustomerEquipment> equipmentDetails = new ArrayList<>();
}

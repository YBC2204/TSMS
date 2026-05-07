package com.tsms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_no")
    private Long empNo;

    @NotBlank(message = "Employee name is required")
    @Column(name = "emp_name", nullable = false)
    private String empName;

    @NotBlank(message = "Mobile number is required")
    @Column(name = "mobile_no", nullable = false)
    private String mobileNo;

    @Column(name = "res_addr", columnDefinition = "TEXT")
    private String resAddr;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_position_id")
    private LookupCategory jobPosition;

    @Column(name = "doj")
    private LocalDate doj;
}

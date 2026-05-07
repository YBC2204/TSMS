package com.tsms.repository;

import com.tsms.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByCustomerNameContainingIgnoreCase(String name);
    List<Customer> findByCategoryId(Long categoryId);
    List<Customer> findByBranchId(Long BranchId);
}

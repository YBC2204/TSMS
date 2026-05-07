package com.tsms.repository;

import com.tsms.entity.CustomerEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerEquipmentRepository extends JpaRepository<CustomerEquipment, Long> {
}

package com.tsms.repository;

import com.tsms.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByEmpNameContainingIgnoreCase(String name);
    List<Employee> findByJobPositionId(Long jobPositionId);
}

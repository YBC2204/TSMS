package com.tsms.service;

import com.tsms.entity.Employee;
import com.tsms.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository repository;

    public List<Employee> getAll() {
        return repository.findAll();
    }

    public Employee getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    public List<Employee> searchByName(String name) {
        return repository.findByEmpNameContainingIgnoreCase(name);
    }

    public List<Employee> getByJobPosition(Long jobPositionId) {
        return repository.findByJobPositionId(jobPositionId);
    }

    public Employee create(Employee employee) {
        return repository.save(employee);
    }

    public Employee update(Long id, Employee employee) {
        Employee existing = getById(id);
        existing.setEmpName(employee.getEmpName());
        existing.setMobileNo(employee.getMobileNo());
        existing.setResAddr(employee.getResAddr());
        existing.setJobPosition(employee.getJobPosition());
        existing.setDoj(employee.getDoj());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

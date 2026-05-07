package com.tsms.service;

import com.tsms.entity.Customer;
import com.tsms.entity.CustomerEquipment;
import com.tsms.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;

    public List<Customer> getAll() {
        return repository.findAll();
    }

    public Customer getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    public List<Customer> searchByName(String name) {
        return repository.findByCustomerNameContainingIgnoreCase(name);
    }

    public List<Customer> getByCategory(Long categoryId) {
        return repository.findByCategoryId(categoryId);
    }

    public List<Customer> getByBranch(Long branchId) {
        return repository.findByBranchId(branchId);
    }

    public Customer create(Customer customer) {
        // Set bidirectional relationship for equipment
        if (customer.getEquipmentDetails() != null) {
            customer.getEquipmentDetails().forEach(equipment -> equipment.setCustomerId(customer.getCustomerId()));
        }
        return repository.save(customer);
    }

    public Customer update(Long id, Customer customer) {
        Customer existing = getById(id);
        existing.setCustomerName(customer.getCustomerName());
        existing.setAddress(customer.getAddress());
        existing.setEmailId(customer.getEmailId());
        existing.setContactPerson(customer.getContactPerson());
        existing.setMobileNo(customer.getMobileNo());
        existing.setAlternativeMobNo(customer.getAlternativeMobNo());
        existing.setCategory(customer.getCategory());
        existing.setNearestLandmark(customer.getNearestLandmark());
        existing.setDistance(customer.getDistance());
        existing.setBranch(customer.getBranch());
        
        // Update equipment details
        existing.getEquipmentDetails().clear();
        if (customer.getEquipmentDetails() != null) {
            customer.getEquipmentDetails().forEach(equipment -> {
                equipment.setCustomerId(existing.getCustomerId());
                existing.getEquipmentDetails().add(equipment);
            });
        }
        
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

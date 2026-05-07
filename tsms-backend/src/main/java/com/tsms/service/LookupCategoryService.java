package com.tsms.service;

import com.tsms.entity.LookupCategory;
import com.tsms.repository.LookupCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LookupCategoryService {

    private final LookupCategoryRepository repository;

    public List<LookupCategory> getByType(String lookupType) {
        return repository.findByLookupTypeAndIsActiveTrue(lookupType);
    }

    public List<LookupCategory> getAllByType(String lookupType) {
        return repository.findByLookupType(lookupType);
    }

    public List<LookupCategory> getAll() {
        return repository.findAll();
    }

    public LookupCategory getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lookup not found with id: " + id));
    }

    public LookupCategory create(LookupCategory lookup) {
        if (repository.existsByNameAndLookupType(lookup.getName(), lookup.getLookupType())) {
            throw new RuntimeException("Lookup value '" + lookup.getName() + "' already exists for type: " + lookup.getLookupType());
        }
        return repository.save(lookup);
    }

    public LookupCategory update(Long id, LookupCategory lookup) {
        LookupCategory existing = getById(id);
        existing.setName(lookup.getName());
        existing.setLookupType(lookup.getLookupType());
        existing.setIsActive(lookup.getIsActive());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

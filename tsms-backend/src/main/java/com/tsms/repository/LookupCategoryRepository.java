package com.tsms.repository;

import com.tsms.entity.LookupCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LookupCategoryRepository extends JpaRepository<LookupCategory, Long> {
    List<LookupCategory> findByLookupTypeAndIsActiveTrue(String lookupType);
    List<LookupCategory> findByLookupType(String lookupType);
    boolean existsByNameAndLookupType(String name, String lookupType);
}

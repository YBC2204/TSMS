package com.tsms.repository;

import com.tsms.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByStockItemContainingIgnoreCase(String stockItem);
    List<Stock> findByBrandId(Long brandId);
    List<Stock> findByStatus(String status);
}

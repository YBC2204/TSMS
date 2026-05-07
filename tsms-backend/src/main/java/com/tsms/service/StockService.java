package com.tsms.service;

import com.tsms.entity.Stock;
import com.tsms.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository repository;

    public List<Stock> getAll() {
        return repository.findAll();
    }

    public Stock getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock item not found with id: " + id));
    }

    public List<Stock> searchByItem(String stockItem) {
        return repository.findByStockItemContainingIgnoreCase(stockItem);
    }

    public List<Stock> getByBrand(Long brandId) {
        return repository.findByBrandId(brandId);
    }

    public List<Stock> getByStatus(String status) {
        return repository.findByStatus(status);
    }

    public Stock create(Stock stock) {
        return repository.save(stock);
    }

    public Stock update(Long id, Stock stock) {
        Stock existing = getById(id);
        existing.setStockItem(stock.getStockItem());
        existing.setBrand(stock.getBrand());
        existing.setSiNumber(stock.getSiNumber());
        existing.setStatus(stock.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

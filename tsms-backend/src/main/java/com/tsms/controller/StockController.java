package com.tsms.controller;

import com.tsms.entity.Stock;
import com.tsms.service.StockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService service;

    @GetMapping
    public ResponseEntity<List<Stock>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Stock>> searchByItem(@RequestParam String item) {
        return ResponseEntity.ok(service.searchByItem(item));
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Stock>> getByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(service.getByBrand(brandId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Stock>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Stock> create(@Valid @RequestBody Stock stock) {
        return new ResponseEntity<>(service.create(stock), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stock> update(@PathVariable Long id, @Valid @RequestBody Stock stock) {
        return ResponseEntity.ok(service.update(id, stock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

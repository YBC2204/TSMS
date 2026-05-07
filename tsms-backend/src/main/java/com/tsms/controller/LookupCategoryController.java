package com.tsms.controller;

import com.tsms.entity.LookupCategory;
import com.tsms.service.LookupCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lookups")
@RequiredArgsConstructor
public class LookupCategoryController {

    private final LookupCategoryService service;

    @GetMapping
    public ResponseEntity<List<LookupCategory>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/type/{lookupType}")
    public ResponseEntity<List<LookupCategory>> getByType(@PathVariable String lookupType) {
        return ResponseEntity.ok(service.getByType(lookupType));
    }

    @GetMapping("/type/{lookupType}/all")
    public ResponseEntity<List<LookupCategory>> getAllByType(@PathVariable String lookupType) {
        return ResponseEntity.ok(service.getAllByType(lookupType));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LookupCategory> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<LookupCategory> create(@RequestBody LookupCategory lookup) {
        return new ResponseEntity<>(service.create(lookup), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LookupCategory> update(@PathVariable Long id, @RequestBody LookupCategory lookup) {
        return ResponseEntity.ok(service.update(id, lookup));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

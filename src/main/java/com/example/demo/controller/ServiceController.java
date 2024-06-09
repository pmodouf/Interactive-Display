package com.example.demo.controller;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;


import com.example.demo.model.Services;
import com.example.demo.repository.ServicesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    private final ServicesRepository servicesRepository;

    public ServiceController(ServicesRepository serviceRepository) {
        this.servicesRepository = serviceRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Services> getAllBusiness() {
        List<Services> businesses = servicesRepository.findAll();
        if (businesses.isEmpty()) {
            throw new EntityNotFoundException("Inga Services hittades.");
        }
        return businesses;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Services> createBusiness(@RequestBody Services services) {
        if (services.getTitle() == null || services.getTitle().isEmpty()) {
            throw new BadRequestException("Titel är obligatoriskt.");
        }
        if (services.getInfo() == null || services.getInfo().isEmpty()) {
            throw new BadRequestException("Info är obligatoriskt.");
        }

        try {
            Services savedService = servicesRepository.save(services);

            return new ResponseEntity<>(savedService, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteFaqById(@PathVariable("id") Long id) {
        if (!servicesRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingen entitet funnen med Id: " + id);
        }

        try {
            servicesRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
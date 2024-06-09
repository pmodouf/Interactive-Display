package com.example.demo.controller;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Labb;
import com.example.demo.repository.LabbRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labb")
public class LabbController {

    private final LabbRepository labbRepository;

    public LabbController(LabbRepository labbRepository) {
        this.labbRepository = labbRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Labb> getAllLabbs() {
        List<Labb> labbs = labbRepository.findAll();
        if (labbs.isEmpty()) {
            throw new EntityNotFoundException("Inga Labb-poster hittades.");
        }
        return labbs;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Labb> createLabb(@RequestBody Labb labb) {
        if (labb.getTitle() == null || labb.getTitle().isEmpty()) {
            throw new BadRequestException("Title är obligatoriskt.");
        }

        try {
            Labb savedLabb = labbRepository.save(labb);
            return new ResponseEntity<>(savedLabb, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteLabbById(@PathVariable("id") Long id) {
        if (!labbRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingen entitet funnen med id: " + id);
        }

        try {
            labbRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
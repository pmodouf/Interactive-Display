package com.example.demo.controller;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Faq;
import com.example.demo.repository.FaqRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {

    private final FaqRepository faqRepository;

    public FaqController(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Faq> getAllBusiness() {
        List<Faq> faqs = faqRepository.findAll();
        if (faqs.isEmpty()) {
            throw new EntityNotFoundException("Inga Faqs hittades.");
        }
        return faqs;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Faq> createBusiness(@RequestBody Faq faq) {
        if (faq.getTitle() == null || faq.getTitle().isEmpty()) {
            throw new BadRequestException("Titel är obligatoriskt.");
        }
        if (faq.getInfo() == null || faq.getInfo().isEmpty()) {
            throw new BadRequestException("Info är obligatoriskt.");
        }

        try {
            Faq savedFaq = faqRepository.save(faq);

            return new ResponseEntity<>(savedFaq, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteFaqById(@PathVariable("id") Long id) {
        if (!faqRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingen entitet funnen med Id: " + id);
        }

        try {
            faqRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
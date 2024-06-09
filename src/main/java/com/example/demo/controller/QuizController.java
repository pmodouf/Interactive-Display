package com.example.demo.controller;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Quiz;
import com.example.demo.repository.QuizRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizRepository quizRepository;

    public QuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Quiz> getAllQuiz() {
        List<Quiz> quizzes = quizRepository.findAll();
        if (quizzes.isEmpty()) {
            throw new EntityNotFoundException("Inga Quiz-poster hittades.");
        }
        return quizzes;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        try {
            if (Objects.isNull(quiz)) {
                throw new BadRequestException("Quiz-objektet är ogiltigt.");
            }
            Quiz savedQuiz = quizRepository.save(quiz);
            return new ResponseEntity<>(savedQuiz, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteInfoById(@PathVariable("id") Long id) {
        if (!quizRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingen entitet funnen med Id: " + id);
        }

        try {
            quizRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
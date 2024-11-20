package org.backend.controller;

import org.backend.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class ExamController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions() {
        List<Question> randomQuestions = getRandomQuestions(20);
        return ResponseEntity.ok(randomQuestions);
    }

    public List<Question> getAllQuestions() {
        return mongoTemplate.findAll(Question.class);
    }

    public List<Question> getRandomQuestions(int count) {
        List<Question> allQuestions = getAllQuestions();
        Collections.shuffle(allQuestions);
        return allQuestions.subList(0, Math.min(count, allQuestions.size()));
    }

}
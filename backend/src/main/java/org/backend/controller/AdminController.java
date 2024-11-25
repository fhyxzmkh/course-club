package org.backend.controller;

import org.backend.model.Message;
import org.backend.model.Post;
import org.backend.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/admin-getPostList")
    public ResponseEntity<List<Post>> getPostList() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return ResponseEntity.ok(mongoTemplate.find(query, Post.class));
    }

    @GetMapping("/admin-deletePost")
    public ResponseEntity<String> delPost(@RequestParam("postId") String postId) {
        Query query = new Query(Criteria.where("_id").is(postId));
        mongoTemplate.remove(query, Post.class);
        return ResponseEntity.ok("Post deleted successfully");
    }

    @GetMapping("/admin-getMessages")
    public ResponseEntity<List<Message>> getMessages() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return ResponseEntity.ok(mongoTemplate.find(query, Message.class));
    }

    @GetMapping("/admin-deleteMessage")
    public ResponseEntity<String> delMessage(@RequestParam("messageId") String messageId) {
        Query query = new Query(Criteria.where("_id").is(messageId));
        mongoTemplate.remove(query, Message.class);
        return ResponseEntity.ok("Message deleted successfully");
    }

    @GetMapping("/admin-getQuestions")
    public ResponseEntity<List<Question>> getQuestions() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return ResponseEntity.ok(mongoTemplate.find(query, Question.class));
    }

    @PostMapping("/admin-uploadQuestion")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        mongoTemplate.save(question);
        return ResponseEntity.ok("Question uploaded successfully");
    }

    @GetMapping("/admin-deleteQuestion")
    public ResponseEntity<String> delQuestion(@RequestParam("questionId") String questionId) {
        Query query = new Query(Criteria.where("_id").is(questionId));
        mongoTemplate.remove(query, Question.class);
        return ResponseEntity.ok("Question deleted successfully");
    }
}

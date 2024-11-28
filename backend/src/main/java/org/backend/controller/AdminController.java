package org.backend.controller;

import org.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private MongoTemplate mongoTemplate;

    // 管理帖子
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

    // 管理评论
    @GetMapping("/admin-getComments")
    public ResponseEntity<List<Comment>> getComments() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return ResponseEntity.ok(mongoTemplate.find(query, Comment.class));
    }

    @GetMapping("/admin-deleteComment")
    public ResponseEntity<String> delComment(@RequestParam("commentId") String commentId) {
        Query query = new Query(Criteria.where("_id").is(commentId));
        mongoTemplate.remove(query, Comment.class);
        return ResponseEntity.ok("Comment deleted successfully");
    }

    // 管理消息
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

    // 管理题目
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

    // 管理成员
    @GetMapping("/admin-getUsers")
    public ResponseEntity<List<User>> getUsers() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return ResponseEntity.ok(mongoTemplate.find(query, User.class));
    }

    @GetMapping("/admin-deleteUser")
    public ResponseEntity<String> delUser(@RequestParam("userId") String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        mongoTemplate.remove(query, User.class);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/admin-setGroup")
    public ResponseEntity<String> setGroup(@RequestParam("userId") String userId, @RequestParam("groupId") int groupId) {

        System.out.println(userId + " " + groupId);

        Query query = new Query(Criteria.where("googleId").is(userId));

        Update update = new Update().set("groupId", groupId);

        mongoTemplate.updateFirst(query, update, "User");

        return ResponseEntity.ok("Group changed successfully");
    }

}

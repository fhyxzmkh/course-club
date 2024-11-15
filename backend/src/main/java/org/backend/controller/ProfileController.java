package org.backend.controller;

import org.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {
    @Autowired
    MongoTemplate mongoTemplate;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserName(@RequestParam("userId") String userId) {
        System.out.println(userId);

        User user = findUserById(userId);

        return ResponseEntity.ok(user);
    }

    private User findUserById(String userId) {
        Query query = new Query(Criteria.where("googleId").is(userId));
        return mongoTemplate.findOne(query, User.class);
    }
}

package org.backend.controller;

import org.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;


@RestController
public class TeamController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/teamMembers")
    public ResponseEntity<List<User>> getTeamMembers(@RequestParam String userId) {
        try {
            // 根据 userId 查找用户
            User user = findUserById(userId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // 根据 groupId 查找所有组员
            List<User> members = findUsersByGroupId(user.getGroupId());

            // 返回组员列表
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            // 处理异常，返回 500 错误
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private User findUserById(String userId) {
        Query query = new Query(Criteria.where("googleId").is(userId));
        return mongoTemplate.findOne(query, User.class);
    }

    private List<User> findUsersByGroupId(int groupId) {
        Query query = new Query(Criteria.where("groupId").is(groupId));
        return mongoTemplate.find(query, User.class);
    }
}

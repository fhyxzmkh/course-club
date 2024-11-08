package org.backend.controller;

import org.backend.model.Comment;
import org.backend.model.Post;
import org.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;
import org.bson.types.ObjectId;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping(produces = "application/json")
    public List<Comment> getCommentList(@RequestParam(required = true) String parentId) {
        if (parentId == null || parentId.isEmpty()) {
            throw new IllegalArgumentException("parentId parameter is required");
        }

        // 将 parentId 转换为 ObjectId 类型
        ObjectId objectId;
        try {
            objectId = new ObjectId(parentId);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid parentId format");
        }

        Query query = new Query(Criteria.where("parent").is(objectId));
        return mongoTemplate.find(query, Comment.class);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Comment createPost(@RequestBody Comment newComment) {
        System.out.println(newComment.get_id());
        System.out.println(newComment.getCreator_name());
        System.out.println(newComment.getParent());
        System.out.println(newComment.getContent());

        return commentRepository.save(newComment);
    }
}
package org.backend.controller;

import org.backend.model.Post;
import org.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping(produces = "application/json")
    public List<Post> getPostList() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "_id"));
        return mongoTemplate.find(query, Post.class);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Post createPost(@RequestBody Post newPost) {
        System.out.println(newPost.get_id());
        System.out.println(newPost.getCreator_name());
        System.out.println(newPost.getContent());

        return postRepository.save(newPost);
    }
}
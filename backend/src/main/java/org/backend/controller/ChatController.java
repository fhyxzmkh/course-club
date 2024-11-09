package org.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.backend.model.Message;
import org.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/chat")
    public ResponseEntity<List<Message>> getChatMessages(@RequestParam String recipientId, HttpSession session) {
        try {
            // 获取当前会话的用户信息
            User currentUser = (User) session.getAttribute("user");
            if (currentUser == null) {
                logger.warn("User not found in session");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            Query query;
            if ("ALL_CHAT".equals(recipientId)) {
                // 获取发送到 ALL_CHAT 的所有消息
                query = new Query(Criteria.where("recipientId").is("ALL_CHAT"));
                logger.info("Query for ALL_CHAT: {}", query);
            } else {
                // 获取当前用户与指定用户之间的消息
                query = new Query(
                        new Criteria().orOperator(
                                Criteria.where("senderId").is(currentUser.getGoogleId()).and("recipientId").is(recipientId),
                                Criteria.where("senderId").is(recipientId).and("recipientId").is(currentUser.getGoogleId())
                        )
                );
                logger.info("Query for user {}: {}", currentUser.getGoogleId(), query);
            }

            List<Message> messages = mongoTemplate.find(query, Message.class);
            logger.info("Fetched messages: {}", messages);

            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            logger.error("Error fetching chat messages", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
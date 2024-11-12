package org.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import org.backend.config.WebSocketManager;
import org.backend.model.Message;
import org.backend.model.MessageRequest;
import org.backend.model.User;
import org.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;

@RestController
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/message")
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest messageRequest, HttpSession session) {
        try {
            User currentUser = (User) session.getAttribute("user");
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }

            MessageRequest.Recipient recipient = messageRequest.getRecipient();
            String recipientId = recipient.get_id();
            String recipientName = recipient.getName();
            String content = messageRequest.getContent();

            if (recipientId == null || content == null) {
                return ResponseEntity.badRequest().body("Recipient and content are required");
            }

            Message message = new Message(recipientId, recipientName, content);
            message.setSenderId(currentUser.getGoogleId());
            message.setSenderName(currentUser.getName());

            messageRepository.save(message);

            // emit message
            ObjectMapper objectMapper = new ObjectMapper();
            String messageJson = objectMapper.writeValueAsString(message);

            // 发送消息
            WebSocketManager.sentToAllUser(messageJson);

            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}
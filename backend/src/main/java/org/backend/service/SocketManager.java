package org.backend.service;

import org.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Service
public class SocketManager {

    private final Map<String, WebSocketSession> userSessions = new HashMap<>();

    public void addUser(User user, WebSocketSession session) {
        userSessions.put(user.getGoogleId(), session);
    }

    public void removeUser(User user) {
        userSessions.remove(user.getGoogleId());
    }

    public WebSocketSession getSocketFromUserID(String userId) {
        return userSessions.get(userId);
    }
}
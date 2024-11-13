package org.backend.config;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;


@Slf4j
@Component
@ServerEndpoint("/WebSocket")
public class WebSocketServer {

    private Session session;

    public static ConcurrentHashMap<String, User> userList = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        WebSocketManager.addWebSocketServer(this);

        log.info("与SessionId：{}建立连接", session.getId());
    }

    @OnClose
    public void onClose() {
        WebSocketManager.removeWebSocketServer(this);
        log.info("WebSocket连接关闭");
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("来自SessionId:{}的消息:{}", session.getId(), message);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        log.error("Session:{}的WebSocket发生错误", session.getId(), error);
    }

    public Session getSession() {
        return session;
    }

    public String getSessionId() {
        return session.getId();
    }
}
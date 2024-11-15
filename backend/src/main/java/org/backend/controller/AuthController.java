package org.backend.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.http.HttpSession;
import org.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class AuthController {

    private static final String CLIENT_ID = "821376447515-9jd7tntvmi1sak22kbvjgi5qn6n3k7qt.apps.googleusercontent.com";

    @Autowired
    private MongoTemplate mongoTemplate;


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody String userInfo, HttpSession session) {
        try {
            JsonObject jsonObject = JsonParser.parseString(userInfo).getAsJsonObject();
            String googleId = jsonObject.get("googleId").getAsString();
            String name = jsonObject.get("name").getAsString();

            User user = getOrCreateUser(googleId, name);
            session.setAttribute("user", user);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.out.println("Failed to log in: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        try {
            session.invalidate(); // Invalidate the session
            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            System.out.println("Failed to log out: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed");
        }
    }

    @GetMapping("/check-session")
    @ResponseBody
    public ResponseEntity<User> checkSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    private User getOrCreateUser(String googleId, String name) {
        Query query = new Query(Criteria.where("googleId").is(googleId));
        User existingUser = mongoTemplate.findOne(query, User.class);

        if (existingUser != null) {
            return existingUser;
        } else {
            User newUser = new User();
            newUser.setName(name);
            newUser.setGoogleId(googleId);
            newUser.setGroupId(0); // 示例：设置默认的groupId为0
            return mongoTemplate.save(newUser);
        }
    }
}
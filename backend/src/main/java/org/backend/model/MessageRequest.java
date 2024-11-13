package org.backend.model;

import org.springframework.data.mongodb.core.index.Indexed;

public class MessageRequest {
    @Indexed
    private Recipient recipient;

    @Indexed
    private String content;

    // Getters and Setters
    public Recipient getRecipient() {
        return recipient;
    }

    public void setRecipient(Recipient recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Inner class for recipient
    public static class Recipient {
        @Indexed(unique = true)
        private String _id;

        private String name;

        // Getters and Setters
        public String get_id() {
            return _id;
        }

        public void set_id(String _id) {
            this._id = _id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
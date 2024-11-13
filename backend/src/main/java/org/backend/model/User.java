package org.backend.model;


import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {

    String name;

    @Indexed(unique = true)
    String googleId;

    @Indexed
    int groupId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", googleId='" + googleId + '\'' +
                ", groupId=" + groupId +
                '}';
    }
}

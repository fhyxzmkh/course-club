package org.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Post")
public class Post {
    @JsonSerialize(using = ToStringSerializer.class)

    @Indexed(unique = true)
    private ObjectId _id;

    @Indexed
    private String creator_name;

    private String content;

    public Post(ObjectId _id, String creator_name, String content) {
        this._id = _id;
        this.creator_name = creator_name;
        this.content = content;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String getCreator_name() {
        return creator_name;
    }

    public void setCreator_name(String creator_name) {
        this.creator_name = creator_name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
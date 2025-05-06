package com.TaskManagerApp.Backend.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Project {
    @Id
    private String id;
    private String name;
    private String description;
    private String teamId;
    public Project(String id, String name, String description, String teamId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.teamId = teamId;
    }
    public Project() {
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Project other = (Project) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (teamId == null) {
            if (other.teamId != null)
                return false;
        } else if (!teamId.equals(other.teamId))
            return false;
        return true;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((teamId == null) ? 0 : teamId.hashCode());
        return result;
    }

    
}

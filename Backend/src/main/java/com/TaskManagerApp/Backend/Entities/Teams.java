package com.TaskManagerApp.Backend.Entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Teams {

    @Id
    private String id;
    private String name;
    private List<String> userIds;
    private List<String> projectIds;
    public Teams(String name) {
        this.name = name;
    }

    public Teams(){}

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Teams other = (Teams) obj;
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
        if (userIds == null) {
            if (other.userIds != null)
                return false;
        } else if (!userIds.equals(other.userIds))
            return false;
        if (projectIds == null) {
            if (other.projectIds != null)
                return false;
        } else if (!projectIds.equals(other.projectIds))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((userIds == null) ? 0 : userIds.hashCode());
        result = prime * result + ((projectIds == null) ? 0 : projectIds.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "Teams [id=" + id + ", name=" + name + "]";
    }

    
}

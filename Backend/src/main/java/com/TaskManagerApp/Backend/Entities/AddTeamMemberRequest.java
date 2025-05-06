package com.TaskManagerApp.Backend.Entities;

public class AddTeamMemberRequest {
    private String teamId;
    private String userId;
    public String getTeamId() {
        return teamId;
    }
    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    

    
}

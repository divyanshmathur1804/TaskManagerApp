package com.TaskManagerApp.Backend.Entities;

public class AddProjectToTeam {
    private String projectId;
    private String teamId;
    public String getProjectId() {
        return projectId;
    }
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
    public String getTeamId() {
        return teamId;
    }
    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    
}

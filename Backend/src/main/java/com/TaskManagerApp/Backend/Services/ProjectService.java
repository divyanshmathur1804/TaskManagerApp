package com.TaskManagerApp.Backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.TaskManagerApp.Backend.Entities.Project;
import com.TaskManagerApp.Backend.Entities.Task;
import com.TaskManagerApp.Backend.Entities.Teams;
import com.TaskManagerApp.Backend.Repositories.ProjectRepository;
import com.TaskManagerApp.Backend.Repositories.TeamRepository;

@Service
public class ProjectService  {
    private ProjectRepository projectRepository;
    private TeamRepository teamRepository;

    public ProjectService(ProjectRepository projectRepository, TeamRepository teamRepository){
        this.projectRepository = projectRepository;
        this.teamRepository = teamRepository;
    }

    public Project addProject(Project project){
        return projectRepository.save(project);
    }

    public List<Project> showAllProjects(){
        return projectRepository.findAll();
    }

    public Optional<Project> findProjectbyId(String id){
        return projectRepository.findById(id);
    }

    public List<Project> findAllById(List<String> Id){
        return projectRepository.findAllById(Id);
    }

    public List<Project> getProjectsByTeam(String teamId) {
        return projectRepository.findByTeamId(teamId);
    }

    public void updateTeamId(String teamId, String projectId){
        Teams team = teamRepository.findById(teamId).orElseThrow();
        Project project = projectRepository.findById(projectId).orElseThrow();

        if(project.getTeamId() != team.getId()){
            project.setTeamId(teamId);
            projectRepository.save(project);
        }
    }

    public List<String> findTasks(String projectId){
        Project project = projectRepository.findById(projectId).orElseThrow();
        List<String> taskId = project.getTaskId();

        return taskId;

    }
}

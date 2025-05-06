package com.TaskManagerApp.Backend.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.TaskManagerApp.Backend.Entities.Project;
import com.TaskManagerApp.Backend.Entities.Teams;
import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Repositories.ProjectRepository;
import com.TaskManagerApp.Backend.Repositories.TeamRepository;
import com.TaskManagerApp.Backend.Repositories.UserRepository;

@Service
public class TeamService {
    private TeamRepository teamRepository;
    private UserRepository userRepository;
    private ProjectRepository projectRepository;

    public TeamService(TeamRepository teamRepository, UserRepository userRepository,ProjectRepository projectRepository){
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public Teams addTeam(Teams team){
        return teamRepository.save(team);

    }

    public List<Teams> findById(List<String> id){
        return teamRepository.findAllById(id);
    }

    public Teams addUsertoTeam(String UserId, String TeamId){
        Teams team = teamRepository.findById(TeamId).orElseThrow();
       
            User user = userRepository.findById(UserId).orElseThrow();

            if (team.getUserIds() == null) {
        team.setUserIds(new ArrayList<>());
    }
    if (user.getTeamIds() == null) {
        user.setTeamIds(new ArrayList<>());
    }
            if (!team.getUserIds().contains(UserId)) {
                team.getUserIds().add(UserId);
                
            }

            if (!user.getTeamIds().contains(TeamId)) {
                user.getTeamIds().add(TeamId);
                userRepository.save(user);
            }

            return teamRepository.save(team);
            
        }
        

        

        
    

    public void addProjecttoTeam(String ProjectId, String TeamId){
        Teams team = teamRepository.findById(TeamId).orElseThrow();
        Project project = projectRepository.findById(ProjectId).orElseThrow();

        if (team.getProjectIds() == null) {
            team.setProjectIds(new ArrayList<>());
        }

        if (!team.getProjectIds().contains(ProjectId)) {
            team.getProjectIds().add(ProjectId);
            teamRepository.save(team);
        }

        if (!(project.getTeamId() == TeamId)) {
            project.setTeamId(TeamId);
            projectRepository.save(project);
        }
    }
}

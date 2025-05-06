package com.TaskManagerApp.Backend.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagerApp.Backend.Entities.AddProjectToTeam;
import com.TaskManagerApp.Backend.Entities.AddTeamMemberRequest;
import com.TaskManagerApp.Backend.Entities.Project;
import com.TaskManagerApp.Backend.Entities.Teams;
import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Security.JWTUtils;
import com.TaskManagerApp.Backend.Services.ProjectService;
import com.TaskManagerApp.Backend.Services.TeamService;
import com.TaskManagerApp.Backend.Services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;



@RestController
@RequestMapping("api/v1/users")
public class DashboardController {
    UserService userService;
    ProjectService projectService;
    TeamService teamService;
    JWTUtils jwtUtils;

    public DashboardController(UserService userService, ProjectService projectService, TeamService teamService,JWTUtils jwtUtils){
        this.userService = userService;
        this.projectService = projectService;
        this.teamService = teamService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/dashboard")
    public List<User> ShowAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/project")
    public Project AddProject(@RequestBody Project project) {
        return projectService.addProject(project);
        
        
    }

    @PostMapping("/team")
    public ResponseEntity<Teams> postMethodName(@RequestBody Teams teams) {
        return ResponseEntity.ok(teamService.addTeam(teams));
        
        
    }

    @PostMapping("/addMember")
    public Teams addTeamMember(@RequestBody AddTeamMemberRequest request ) {
        return teamService.addUsertoTeam(request.getUserId(), request.getTeamId());
    }

    @GetMapping("/getTeams")
    public List<Teams> fetchTeams(@RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        String token = auth.startsWith("Bearer ") ? auth.substring(7).trim() : auth.trim();
        User user = userService.findUserByEmail(jwtUtils.getEmailFromToken(token))
        .orElseThrow(() -> new RuntimeException("User not found"));
        List<Teams> res = new ArrayList<>();
        res = teamService.findById(user.getTeamIds());

        return res;
    }

    @PostMapping("/addProjectToTeam")
    public void postMethodName(@RequestBody AddProjectToTeam request) {
        teamService.addProjecttoTeam(request.getProjectId(), request.getTeamId());
    }

    @GetMapping("/getProjects")
    public List<Project> fetchProjects(@RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        String token = auth.startsWith("Bearer ") ? auth.substring(7).trim() : auth.trim();
        User user = userService.findUserByEmail(jwtUtils.getEmailFromToken(token))
        .orElseThrow(() -> new RuntimeException("User not found"));
        List<Teams> res = new ArrayList<>();
        res = teamService.findById(user.getTeamIds());
        List<Project> ans = new ArrayList<>();
        for (Teams team : res) {
            if (team.getProjectIds() == null) {
                List<Project> test = new ArrayList<>();
                ans.addAll(test);
            }else{
                ans.addAll(projectService.findAllById(team.getProjectIds()));

            }
            
        }

        return ans;
    }
    
    
    
    
    

    
    
}

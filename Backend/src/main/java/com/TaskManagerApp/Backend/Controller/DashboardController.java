package com.TaskManagerApp.Backend.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/v1/users")
@CrossOrigin
public class DashboardController {
    UserService userService;

    public DashboardController(UserService userService){
        this.userService = userService;
    }

    
    
}

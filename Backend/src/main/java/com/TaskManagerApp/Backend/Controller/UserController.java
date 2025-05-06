package com.TaskManagerApp.Backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagerApp.Backend.Entities.LoginDetails;
import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Security.JWTUtils;
import com.TaskManagerApp.Backend.Services.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private JWTUtils jwtUtils;

    public UserController(UserService userService, PasswordEncoder passwordEncoder,JWTUtils jwtUtils){
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signup")
    public User AddNewUser(@RequestBody User user) {
        System.out.println(user.getEmail());
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> postMethodName(@RequestBody LoginDetails loginDetails) {
        Optional<User> userOptional = userService.findUserByEmail(loginDetails.getUsername());
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(user != null && passwordEncoder.matches(loginDetails.getPassword(), user.getPassword())){
            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of("token",token));
        }else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
        
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<User>> getMethodName(@RequestParam String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }
    

    
    
    
    
    
}

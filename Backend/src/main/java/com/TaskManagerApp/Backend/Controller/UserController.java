package com.TaskManagerApp.Backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagerApp.Backend.DTO.UserDTO;
import com.TaskManagerApp.Backend.Entities.LoginDetails;
import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Repositories.UserRepository;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



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

    @GetMapping("/getUser")
    public ResponseEntity<User> fetchUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
    try {
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7).trim()
                : authHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

        return ResponseEntity.ok(user);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

    @GetMapping("/getUserList")
    public List<User> fetchUserList(@RequestParam List<String> id) {
        return userService.findUsersById(id);
    }

    @GetMapping("/getUserById")
    public User fetchUserbyId(@RequestParam String Id) {
        return userService.findById(Id).orElseThrow();
    }

    @PostMapping("/updateUserProfile")
    public User UpdateProfile(@RequestBody String URL, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        try {
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7).trim()
                : authHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

        return userService.updateUserProfle(URL, user.getId());

        
    } catch (Exception e) {
        throw e;
    }
    }

    @GetMapping("/getUserWithProfile")
    public User fetchUserWithProfile( @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7).trim()
                : authHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

        return user;
    }

    @PostMapping("/updateUserHeader")
    public User setUserHeader(@RequestBody String URL, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        //TODO: process POST request
        try {
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7).trim()
                : authHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

        return userService.updateUserHeader(URL, user.getId());

        
    } catch (Exception e) {
        throw e;
    }
        
    }

    @PutMapping("/updateUser")
    public UserDTO updateUser(@RequestBody UserDTO entity,@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader ) {
        try {
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7).trim()
                : authHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

                return userService.updateUser(entity, user.getId());
    } catch (Exception e) {
        throw e;
    }
    }
    
    
    
    
    
    
    
    

    
    
    
    
    
}

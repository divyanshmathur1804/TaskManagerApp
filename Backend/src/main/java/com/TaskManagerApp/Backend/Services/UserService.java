package com.TaskManagerApp.Backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TaskManagerApp.Backend.DTO.UserDTO;
import com.TaskManagerApp.Backend.Entities.User;
import com.TaskManagerApp.Backend.Repositories.UserRepository;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findUserByEmail(email);

    }

    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.insert(user);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findById(String id){
        return userRepository.findById(id);
    }

    public List<User> findUsersById(List<String> id){
        return userRepository.findAllById(id);
    }

    public User updateUserProfle(String URL, String Id){
    User user = userRepository.findById(Id).orElseThrow();

    // Do NOT decode the URL here!
    user.setProfileImageURL(URL);

    userRepository.save(user);
    return user;
}

public User updateUserHeader(String URL, String Id){
    User user  = userRepository.findById(Id).orElseThrow();

    user.setHeaderImageURL(URL);

    userRepository.save(user);
    return user;
}

public UserDTO updateUser(UserDTO userdto, String Id){
    User user = userRepository.findById(Id).orElseThrow();
    if (userdto.getFirstName() != "") user.setFirstName(userdto.getFirstName());
        if (userdto.getLastName() != "") user.setLastName(userdto.getLastName());
        if (userdto.getJobTitle() != "") user.setJobTitle(userdto.getJobTitle());
        if (userdto.getDepartment() != "") user.setDepartment(userdto.getDepartment());
        if (userdto.getLocation() != "") user.setLocation(userdto.getLocation());

        userRepository.save(user);

        UserDTO updated = new UserDTO();
        updated.setFirstName(user.getFirstName());
        updated.setLastName(user.getLastName());
        updated.setJobTitle(user.getJobTitle());
        updated.setDepartment(user.getDepartment());
        updated.setLocation(user.getLocation());
        return updated;
    }

    
}


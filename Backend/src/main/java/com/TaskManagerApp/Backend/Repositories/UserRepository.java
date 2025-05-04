package com.TaskManagerApp.Backend.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.TaskManagerApp.Backend.Entities.User;
import java.util.List;


public interface UserRepository extends MongoRepository<User,String> {
    public Optional<User> findUserByEmail(String email);
    
}

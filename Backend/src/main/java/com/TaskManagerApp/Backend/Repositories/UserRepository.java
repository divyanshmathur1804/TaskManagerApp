package com.TaskManagerApp.Backend.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagerApp.Backend.Entities.User;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    public Optional<User> findUserByEmail(String email);
    
}

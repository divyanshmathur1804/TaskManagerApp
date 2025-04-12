package com.TaskManagerApp.Backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.TaskManagerApp.Backend.Entities.User;

public interface UserRepository extends MongoRepository<User,Integer> {
    
}

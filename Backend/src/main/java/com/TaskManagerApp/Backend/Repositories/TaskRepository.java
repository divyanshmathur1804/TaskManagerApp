package com.TaskManagerApp.Backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagerApp.Backend.Entities.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task,String> {
    
}

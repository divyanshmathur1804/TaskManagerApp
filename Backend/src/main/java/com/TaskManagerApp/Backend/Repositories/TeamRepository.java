package com.TaskManagerApp.Backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagerApp.Backend.Entities.Teams;

@Repository
public interface TeamRepository extends MongoRepository<Teams,String> {
    
}

package com.TaskManagerApp.Backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagerApp.Backend.Entities.Project;
import java.util.List;


@Repository
public interface ProjectRepository extends MongoRepository<Project,String> {
    List<Project> findByTeamId(String teamId);


    
}

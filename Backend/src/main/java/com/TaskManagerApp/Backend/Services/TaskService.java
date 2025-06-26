package com.TaskManagerApp.Backend.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.TaskManagerApp.Backend.Entities.Project;
import com.TaskManagerApp.Backend.Entities.Task;
import com.TaskManagerApp.Backend.Repositories.ProjectRepository;
import com.TaskManagerApp.Backend.Repositories.TaskRepository;

@Service
public class TaskService {
    private TaskRepository taskRepository;
    private ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository){
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task AddTask(String projectId, Task task){
        if (task.getStatus() == null) {
            task.setStatus("todo");
        }
        Task NewTask = taskRepository.save(task);
        Project project = projectRepository.findById(projectId).orElseThrow();
        if (project.getTaskId() == null) {
            project.setTaskId(new ArrayList<>());
        }

        if (!project.getTaskId().contains(NewTask.getId())) {
            project.getTaskId().add(task.getId());
            projectRepository.save(project);
        }

        if (task.getProjectId() == null) {
            task.setProjectId(projectId);
            taskRepository.save(task);
            
        }

        return task;


    }

    public List<Task> getTaskById(List<String> TaskId){
        return taskRepository.findAllById(TaskId);

    }

    public Task updateTaskStatus(String taskId, String Status){
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(Status);
        return taskRepository.save(task); 
    }

    public Task findIndividualTask(String Id){
        return taskRepository.findById(Id).orElseThrow();
    }
}

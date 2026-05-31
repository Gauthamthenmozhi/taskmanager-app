package com.taskmanager.service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.model.Task;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow();
    }

    private TaskResponse toResponse(Task task) {
        TaskResponse res = new TaskResponse();
        res.setId(task.getId());
        res.setTitle(task.getTitle());
        res.setDescription(task.getDescription());
        res.setStage(task.getStage());
        return res;
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findByUserId(getCurrentUser().getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStage(request.getStage() != null ? request.getStage() : Task.Stage.TODO);
        task.setUserId(getCurrentUser().getId());
        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(String id, TaskRequest request) {
        Task task = taskRepository.findByIdAndUserId(id, getCurrentUser().getId())
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStage() != null) task.setStage(request.getStage());
        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(String id) {
        Task task = taskRepository.findByIdAndUserId(id, getCurrentUser().getId())
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}

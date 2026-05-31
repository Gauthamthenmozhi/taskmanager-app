package com.taskmanager.dto;

import com.taskmanager.model.Task.Stage;
import lombok.Data;

@Data
public class TaskResponse {
    private String id;
    private String title;
    private String description;
    private Stage stage;
}

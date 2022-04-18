import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { query } from 'express';
import { resolve } from 'path';
import { Status, TaskDto, TaskType } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}
    @Get()
    list(): Promise<TaskDto[]> {
        return this.taskService.GetTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id): Promise<TaskDto> {
        return this.taskService.GetTaskById(id);
    }

    @Post()
    CreateNewTask(@Body() task: TaskDto) {
        return this.taskService.CreateNewTask(task);
    }

    @Put(':id')
    UpdateTask(@Param('id') id, @Query() query) {
        const status = query.status;
        return this.taskService.UpdateTask(id, status);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { query } from 'express';
import { resolve } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Status, TaskDto, TaskType } from './dto/task.dto';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
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

    @Delete(':id')
    DeleteTask(@Param('id') id) {
        return this.taskService.DeleteTaskById(id);
    }
}

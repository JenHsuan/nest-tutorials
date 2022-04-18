import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { query } from 'express';
import { resolve } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Status, TaskDto, TaskType } from './dto/task.dto';
import { TaskService } from './task.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}
    @Get()
    list(): Promise<TaskDto[]> {
        return this.taskService.GetTasks();
    }

    @ApiParam({ name: 'id'})
    @Get(':id')
    getTaskById(@Param('id') id): Promise<TaskDto> {
        return this.taskService.GetTaskById(id);
    }
    
    @ApiBody({ type: TaskDto })
    @Post()
    CreateNewTask(@Body() task: TaskDto) {
        return this.taskService.CreateNewTask(task);
    }

    @ApiParam({ name: 'id'})
    @Put(':id')
    UpdateTask(@Param('id') id, @Query() query) {
        const status = query.status;
        return this.taskService.UpdateTask(id, status);
    }

    @ApiParam({ name: 'id'})
    @Delete(':id')
    DeleteTask(@Param('id') id) {
        return this.taskService.DeleteTaskById(id);
    }
}

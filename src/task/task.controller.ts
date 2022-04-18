import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}
    @Get()
    list(): Observable<TaskDto[]> {
        return this.taskService.GetTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id): Observable<TaskDto> {
        return this.taskService.GetTaskById(id);
    }

    @Post()
    CreateNewTask(@Body() task: TaskDto) {
        return this.taskService.CreateNewTask(task);
    }

    @Put(':id')
    UpdateTask(@Param('id') id, @Query() query) {
        if (query && query.status) {
            const status = query.status;
            return this.taskService.UpdateTask(id, status);    
        }
        return this.taskService.GetTasks();
    }

    @Delete(':id')
    DeleteTask(@Param('id') id) {
        return this.taskService.DeleteTaskById(id);
    }
}

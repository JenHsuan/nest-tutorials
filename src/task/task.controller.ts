import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}

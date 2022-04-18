import { Controller, Get, Param } from '@nestjs/common';
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
}

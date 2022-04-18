import { Observable } from 'rxjs';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/dto/user.dto';
import { RoleGuard } from 'src/user/role.guard';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}
    @Get()
    list(): Observable<TaskDto[]> {
        return this.taskService.GetTasks();
    }

    @ApiParam({ name: 'id'})
    @Get(':id')
    getTaskById(@Param('id') id): Observable<TaskDto> {
        return this.taskService.GetTaskById(id);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @ApiBody({ type: TaskDto })
    @Post()
    CreateNewTask(@Body() task: TaskDto) {
        return this.taskService.CreateNewTask(task);
    }

    @ApiParam({ name: 'id'})
    @Put(':id')
    UpdateTask(@Param('id') id, @Query() query) {
        if (query && query.status) {
            const status = query.status;
            return this.taskService.UpdateTask(id, status);    
        }
        return this.taskService.GetTasks();
    }

    @ApiParam({ name: 'id'})
    @Delete(':id')
    DeleteTask(@Param('id') id) {
        return this.taskService.DeleteTaskById(id);
    }
}

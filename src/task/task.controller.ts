import { Observable } from 'rxjs';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiUnauthorizedResponse, OmitType } from '@nestjs/swagger';
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

    //Get tasks
    @ApiOkResponse({
        description: 'OK',
        type: [TaskDto],
    })
    @ApiNotFoundResponse({
        description: '404. NotFoundException. Task was not found',
    })
    @ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    })
    @ApiOperation({ summary: 'Get tasks' })
    @Get()
    list(): Observable<TaskDto[]> {
        return this.taskService.GetTasks();
    }

    //Get a task
    @ApiOkResponse({
        description: 'OK',
        type: TaskDto,
    })
    @ApiNotFoundResponse({
        description: '404. NotFoundException. Task was not found',
    })
    @ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    })
    @ApiOperation({ summary: 'Get task by id' })
    @ApiParam({ name: 'id'})
    @Get(':id')
    getTaskById(@Param('id') id): Observable<TaskDto> {
        return this.taskService.GetTaskById(id);
    }

    //Create
    @ApiOkResponse({
        description: 'OK',
        type: [TaskDto],
    })
    @ApiNotFoundResponse({
        description: '404. NotFoundException. Task was not found',
    })
    @ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    })
    @ApiOperation({ summary: 'Create a task' })
    @UseGuards(RoleGuard(Role.Admin))
    @ApiBody({ type: TaskDto })
    @Post()
    CreateNewTask(@Body() task: TaskDto): Observable<TaskDto[]> {
        return this.taskService.CreateNewTask(task);
    }

    //Update
    @ApiOkResponse({
        description: 'OK',
        type: [TaskDto],
    })
    @ApiNotFoundResponse({
        description: '404. NotFoundException. Task was not found',
    })
    @ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    })
    @ApiOperation({ summary: 'Update a task' })
    @ApiQuery({
        name: 'req',
        type: OmitType(TaskDto, ['id', 'taskType'])
    })
    @ApiParam({ name: 'id'})
    @Put(':id')
    UpdateTask(@Param('id') id, @Query('req') query): Observable<TaskDto[]> {
        if (query && query.status) {
            const status = query.status;
            return this.taskService.UpdateTask(id, status);
        }
        return this.taskService.GetTasks();
    }

    //Delete task
    @ApiOkResponse({
        description: 'OK',
        type: [TaskDto],
    })
    @ApiNotFoundResponse({
        description: '404. NotFoundException. Task was not found',
    })
    @ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    })
    @ApiOperation({ summary: 'Delete a task' })
    @ApiParam({ name: 'id'})
    @Delete(':id')
    DeleteTask(@Param('id') id): Observable<TaskDto[]> {
        return this.taskService.DeleteTaskById(id);
    }
}

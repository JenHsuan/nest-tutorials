import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Status, TaskDto, TaskType } from './dto/task.dto';

@Controller('task')
export class TaskController {
    @Get()
    list(): Observable<TaskDto[]> {
        return of([Object.assign(new TaskDto(), {
            id: 0,
            status: Status.COMPLETED,
            taskType: TaskType.REGULAR_MAIL
        }),Object.assign(new TaskDto(), {
            id: 1,
            status: Status.COMPLETED,
            taskType: TaskType.REGULAR_MAIL
        })]);
    }
}

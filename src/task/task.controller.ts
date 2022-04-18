import { Controller, Get } from '@nestjs/common';
import { resolve } from 'path';
import { Status, TaskDto, TaskType } from './dto/task.dto';

@Controller('task')
export class TaskController {
    @Get()
    list(): Promise<TaskDto[]> {
        return new Promise((resolve) => {
            setTimeout(function(){
                resolve([Object.assign(new TaskDto(), {
                    id: 0,
                    status: Status.COMPLETED,
                    taskType: TaskType.REGULAR_MAIL
                })]);
            }, 250);
        });
    }
}

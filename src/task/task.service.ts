import { Injectable } from '@nestjs/common';
import { Status, TaskDto, TaskType } from './dto/task.dto';
import * as _ from 'lodash';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [Object.assign(new TaskDto(), {
        id: 0,
        status: Status.COMPLETED,
        taskType: TaskType.REGULAR_MAIL
    }),Object.assign(new TaskDto(), {
        id: 1,
        status: Status.COMPLETED,
        taskType: TaskType.REGULAR_MAIL
    })];

    GetTasks(): Promise<TaskDto[]> {
        const tasks: TaskDto[] = _.cloneDeep(this.tasks);
        return new Promise((resolve) => {
            setTimeout(function(){
                resolve(tasks);
            }, 250)
        });
    }

    GetTaskById(id: number): Promise<TaskDto | null> {
        const tasks: TaskDto[] = _.cloneDeep(this.tasks);
        return new Promise((resolve) => {
            setTimeout(function(){
                resolve(tasks.find(task => task.id == id));
            }, 250)
        });
    }
}

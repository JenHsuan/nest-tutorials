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

    CreateNewTask(task: Omit<TaskDto, 'id'>): Promise<TaskDto[]> {
        this.tasks.push(Object.assign(new TaskDto(), task, {id: this.tasks.length}));
        return this.GetTasks();
    }

    UpdateTask(id: number, status: Status) {
        let oldTask = this.tasks.find(task => task.id == id);
        if (oldTask) {
            oldTask = Object.assign(oldTask, {
                status: status
            })
        }

        return this.GetTasks();
    }
}

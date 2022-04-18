import { Injectable } from '@nestjs/common';
import { Status, TaskDto, TaskType } from './dto/task.dto';
import * as _ from 'lodash';
import { delay, Observable, of } from 'rxjs';

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

    private get Tasks() {
        const tasks: TaskDto[] = _.cloneDeep(this.tasks);
        return tasks;
    }

    GetTasks(): Observable<TaskDto[]> {
        return of(this.Tasks).pipe(delay(200));
    }

    GetTaskById(id: number): Observable<TaskDto | null> {
        return of(this.Tasks.find(task => task.id == id)).pipe(delay(200));
    }

    CreateNewTask(task: TaskDto): Observable<TaskDto[]> {
        this.tasks.push(Object.assign(new TaskDto(), task, {id: this.tasks.length}));
        return this.GetTasks();
    }

    UpdateTask(id: number, status: Status): Observable<TaskDto[]> {
        let oldTask = this.tasks.find(task => task.id == id);
        if (oldTask) {
            oldTask = Object.assign(oldTask, {
                status: status
            })
        }

        return this.GetTasks();
    }

    DeleteTaskById(id: number): Observable<TaskDto[]>{
        let index = this.tasks.findIndex(task => task.id == id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
        return this.GetTasks();
    }
}

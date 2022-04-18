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
}

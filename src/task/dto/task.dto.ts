import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

export enum Status {
    IN_PROGRESS = 'inProgress',
    COMPLETED = 'completed',
    INITIAL = 'initial',
    START = 'start',
}

export enum TaskType {
    REGULAR_MAIL = 'regularMail',
    NONE = 'none',
}

export class TaskDto {
    id: number;

    @ApiProperty({
        enum: Object.values(Status)
      })
    status: Status = Status.INITIAL;
    
    @IsEnum(TaskType)
    @IsNotEmpty()
    @ApiProperty({
        enum: Object.values(TaskType)
    })
    taskType: TaskType;
}
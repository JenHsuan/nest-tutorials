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
    @IsEnum(Status)
    @ApiProperty({
        enum: Object.values(Status)
    })
    status: Status = Status.INITIAL;
    
    @IsNotEmpty()
    @IsEnum(TaskType)
    @ApiProperty({
        enum: Object.values(TaskType)
    })
    taskType: TaskType;
}
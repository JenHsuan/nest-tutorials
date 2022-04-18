import { ApiProperty } from "@nestjs/swagger";

export enum Role {
    User = 'User',
    Admin = 'Admin',
}
export class UserDto {
    userId: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    role: Role;
}
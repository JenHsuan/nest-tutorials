export enum Role {
    User = 'User',
    Admin = 'Admin',
}
export class UserDto {
    userId: number;
    username: string;
    password: string;
    role: Role;
}
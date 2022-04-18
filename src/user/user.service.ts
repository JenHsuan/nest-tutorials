import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    private readonly users = [
        Object.assign(new UserDto(), {
            userId: 1,
            username: 'username',
            password: 'password',
        })
    ];

    async findOne(username: string): Promise<UserDto | undefined> {
        return this.users.find(user => user.username === username);
    }
}

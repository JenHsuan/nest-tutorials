import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Role, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    private readonly users = [
        Object.assign(new UserDto(), {
            userId: 1,
            username: 'username',
            password: 'password',
            role: Role.Admin
        }),
        Object.assign(new UserDto(), {
            userId: 2,
            username: 'username2',
            password: 'password2',
            role: Role.User
        })
    ];

    findOne(username: string): Observable<UserDto | undefined> {
        return of(this.users.find(user => user.username === username));
    }
}

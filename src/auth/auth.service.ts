import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, Observable, of } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    //return found user (for local startegy)
    retrieveUser(username: string, pass: string): Observable<Omit<UserDto, 'password'> | null> {
      return this.userService.findOne(username).pipe(
        map(user => {
          if (user && user.password) {
            //remove password and return user
            const { password, ...result } = user;
            return result;
          }
          return null;
        })
      )
    }
    
    //exposed API
    login(user: UserDto): Observable<any> {
        const payload = { username: user.username, sub: user.userId, role: user.role };
        return of({
          access_token: this.jwtService.sign(payload),
        });
    }
}

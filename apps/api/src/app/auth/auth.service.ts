import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto, User } from "@safari-store/api-interfaces";
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserModel } from '../users/user.schemas';
import { jwtConstants } from '../shared/jwt-constant';

@Injectable()
export class AuthService {


  constructor(
    private usersService: UsersService
  ) {    }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.usersService.getByEmail(loginUserDto.email);
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if(!user) {
      throw new HttpException('Can not login', HttpStatus.UNAUTHORIZED);
    }
    if(!isMatch) {
      throw new HttpException('Can not login', HttpStatus.UNAUTHORIZED);
    }
    return this.sanitizeUser(user);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const user = await this.usersService.getByEmail(email);
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const createdUser = await this.usersService.create(createUserDto);
    return this.sanitizeUser(createdUser);
  }

  async signPayload(payload: any) {
    return sign(payload, jwtConstants.secret, { expiresIn: '7d' });
  }

  sanitizeUser(user: UserModel): User {
    const {password, _id,...result} = user;
    return {...result, _id: String(_id)};
  }

}

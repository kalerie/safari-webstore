import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, User } from '@safari-store/api-interfaces';
import { LoginResultDto } from '../../../../../libs/api-interfaces/src/dtos/login-result.dto';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService
  ) {  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req): Promise<LoginResultDto> {
    const user = await this.authService.login(loginUserDto);
    const payload = {
      email: loginUserDto.email,
      id: user._id
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo(@Request() req) {
    const {password, ...currentUser} = await this.usersService.getById(req.user.id);
    return currentUser;
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

}

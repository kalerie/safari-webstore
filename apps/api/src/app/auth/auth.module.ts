import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../shared/jwt-constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../shared/jwt.strategy';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard
  ],
  controllers: [
    AuthController
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: {expiresIn: '60s'}
    })
  ],
})

export class AuthModule {

}

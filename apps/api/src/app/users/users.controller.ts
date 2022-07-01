import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@safari-store/api-interfaces';
import { UserModel } from './user.schemas';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';
import { ProductModel } from '../products/product.schemas';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {  }

  @Get()
  getAll(): Promise<UserModel[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.getById(id);
  }

  @Get(`current/favorites`)
  async getUserFavorites(@Request() req): Promise<ProductModel[]> {
    const user = await this.usersService.getById(req.user.id);
    return user.favorites;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove(id);
  }

  @Put(`current`)
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req): Promise<UserModel> {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Put(`current/favorites/:id`)
  async updateFavorites(@Param('id') id: string, @Request() req): Promise<UserModel> {
    const user = await this.usersService.getById(req.user.id);
    let updateUser: UpdateUserDto = {};
    if(user.favorites) {
      if(!user.favorites.some(el => String(el._id) === id)) {
        updateUser = {
          favorites: [...user.favorites.map(el => String(el._id)), id]
        }
      }
    } else {
      updateUser = {
        favorites: [id]
      }
    }
    return this.usersService.update(req.user.id, updateUser);
  }

  @Delete('current/favorites/:id')
  async removeFavorite(@Param('id') id: string, @Request() req): Promise<UserModel> {
    const user = await this.usersService.getById(req.user.id);
    const updateUser: UpdateUserDto = {
      favorites: user.favorites.map(el => String(el._id)).filter(el => el !== id)
    }
    return this.usersService.update(req.user.id, updateUser);
  }

}

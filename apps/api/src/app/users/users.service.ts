import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto, UpdateUserDto } from "@safari-store/api-interfaces";
import { Model } from "mongoose";
import { UserDocument, UserModel } from './user.schemas';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {    }

  async getAll(): Promise<UserModel[]> {
    return this.userModel.find().lean().exec();
  }

  async getById(id: string): Promise<UserModel> {
    return this.userModel.findById(id).populate('favorites').lean();
  }

  async getByEmail(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email: email}).lean().exec();
  }

  async create(userDto: CreateUserDto): Promise<UserModel> {
    const newUser = new this.userModel(userDto);
    const {_id} = await newUser.save();
    return this.userModel.findById(_id).lean().exec();
  }

  async remove(id: string): Promise<UserModel> {
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserModel> {
    return this.userModel.findByIdAndUpdate(id, userDto, {new: true});
  }

}

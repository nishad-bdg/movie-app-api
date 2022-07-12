import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'typing';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import saltRound from '../constants/index';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, Number(saltRound));
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.password = hash;
    const newUser = new this.userModel(createUserDto);
    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: error.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getUser(email: string): Promise<User> {
    const emailData = email.toLowerCase();
    const user = await this.userModel.findOne({ emailData });
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Favorites } from 'typing';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('favorite') private readonly favoriteModel: Model<Favorite>,
    private readonly userService: UserService,
  ) {}
  async create(
    createFavoriteDto: CreateFavoriteDto,
    userEmail: string,
  ): Promise<Favorite> {
    const user = await this.userService.getUser(userEmail);
    const favorite = await this.favoriteModel.findOne({
      user: user._id,
      id: createFavoriteDto.id,
    });
    if (user && !favorite) {
      const newObj = {
        ...createFavoriteDto,
        user: user._id,
      };
      const newFavorite = new this.favoriteModel(newObj);
      await newFavorite.save();
      return newFavorite;
    }
  }

  async findAll(): Promise<Favorites> {
    return await this.favoriteModel.find();
  }

  async findOne(id: string): Promise<Favorite> {
    return await this.favoriteModel.findOne({ _id: id });
  }

  async remove(id: string, email: string): Promise<void> {
    const user = await this.userService.getUser(email);
    const favorite = await this.favoriteModel.findOne({
      id: id,
      userId: user._id,
    });
    if (favorite) {
      await this.favoriteModel.deleteOne({ _id: favorite._id });
    } else {
      console.log('can not delete');
    }
  }
}

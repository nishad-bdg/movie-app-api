import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Favorites } from 'typing';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Request() request: any,
  ) {
    const email = request.user.username;
    return this.favoriteService.create(createFavoriteDto, email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Favorites> {
    return await this.favoriteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<void> {
    const userEmail = request.user.username;
    await this.favoriteService.remove(id, userEmail);
  }
}

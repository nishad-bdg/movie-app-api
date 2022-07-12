import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  original_title: string;

  @IsNotEmpty()
  poster_path: string;
}

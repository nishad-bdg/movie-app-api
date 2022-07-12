import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  id: string; //movie id

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  original_title: string;

  @Prop({ required: true })
  poster_path: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

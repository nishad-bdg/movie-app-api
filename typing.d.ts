import { Mongoose } from 'mongoose';

export interface User extends Mongoose.Document {
  _id: string;
  email: string;
  password?: string;
}

export interface AccessToken {
  access_token: string;
}

export interface Favorite extends Mongoose.Document {
  _id: string;
  userId: string;
  id: string;
  title: string;
  poster_path: string;
}

export type Favorites = Favorite[];

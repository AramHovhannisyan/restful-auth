import mongoose from 'mongoose';

interface UserModel {
  _id: mongoose.Types.ObjectId,
  username: string,
  email: string,
  password: string,
}

export default class UserDto {
  id;
  username;
  email;

  constructor (user: UserModel) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
  }
}
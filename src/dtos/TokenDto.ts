import mongoose from 'mongoose';

interface TokenModel {
  username: string,
  email: string,
}

export default class TokenDto {
  username;
  email;

  constructor (user: TokenModel) {
    this.username = user.username;
    this.email = user.email;
  }
}
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { config } from "../config/config";
import { Token } from '../models/TokenModel';
import UserDto from '../dtos/UserDto';

const generateTokens = async (payload: UserDto) => {
  const { username, email } = payload;
  const accessToken = await jwt.sign({ username, email }, config.jwt.secretAccess, { expiresIn: '15m' });
  const refreshToken = await jwt.sign({ username, email }, config.jwt.secretRefresh, { expiresIn: '15d' });

  return { accessToken, refreshToken };
};

const saveToDb = async (user: UserDto, refreshToken: string) => {
  const oldToken = await Token.findOne({ user: user.id});

  if (oldToken) {
    oldToken.refreshToken = refreshToken;
    return oldToken.save(); 
  }

  return await Token.create({ user: user.id, refreshToken });
};

export { generateTokens, saveToDb };
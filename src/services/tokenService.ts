import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { config } from "../config/config";
import { Token } from '../models/TokenModel';
import UserDto from '../dtos/UserDto';

const generateTokens = async (payload: UserDto) => {
  const { username, email } = payload;
  const accessToken = await jwt.sign({ username, email }, config.jwt.secretAccess, { expiresIn: '15m' });
  const refreshToken = await jwt.sign({ username, email }, config.jwt.secretRefresh, { expiresIn: '15m' });

  return { accessToken, refreshToken };
};

const saveToDb = async (user: UserDto, refreshToken: string) => {
  const isTokenSaved = await Token.create({ user: user.id, refreshToken });

  console.log('isTokenSaved:', isTokenSaved);
  
};

export { generateTokens, saveToDb };
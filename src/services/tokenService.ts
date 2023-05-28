import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { config } from "../config/config";
import { Token } from '../models/TokenModel';
import UserDto from '../dtos/UserDto';

const generateTokens = async (payload: UserDto) => {
  const { username, email, id: objectId } = payload;
  const id = objectId.toString();
  
  const accessToken = await jwt.sign({ id, username, email }, config.jwt.secretAccess, { expiresIn: '1m' });
  const refreshToken = await jwt.sign({ id, username, email }, config.jwt.secretRefresh, { expiresIn: '15d' });

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

const removeToken = async (refreshToken: string) => {
  return await Token.deleteOne({ refreshToken });
};

const validateRefreshToken = async (refreshToken: string) => {
  try {
    return await jwt.verify(refreshToken, config.jwt.secretRefresh);
  } catch (error) {
    return null;
  }
};

const validateAccessToken = async (accessToken: string) => {
  try {
    return jwt.verify(accessToken, config.jwt.secretAccess);
  } catch (error) {
    return null;
  }
};

const getToken = async (refreshToken: string) => {
    return await Token.findOne({ refreshToken });
};

export { generateTokens, saveToDb, removeToken, validateAccessToken, validateRefreshToken, getToken };
import bcrypt from "bcryptjs";
import { User } from '../lib/models/UserModel';
import { removeToken, validateRefreshToken, getToken } from "./tokenService";
import UserDto from '../lib/dtos/UserDto';
import AppError from '../lib/errorHandling/AppError';

// Logging in user
const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    // Check if user exists email | username
    const user = await User.findOne({ $or:[ {'email': usernameOrEmail}, {'username': usernameOrEmail} ]});
    if (!user) {
      throw new AppError('User not found', 401);
    }

    // Validate password
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw new AppError('Wrong Password', 401);
    }
    
    // Create DTO
    return new UserDto(user);
  } catch (error: any) {
    throw error;
  }
};

/**
 * Logging out by Removing Refresh token from DB
 */
const logoutUser = async (refreshToken: string) => {
    if (!refreshToken) {
      throw new AppError(`You are not authorized`, 401);
    }

    const tokenRemoved = await removeToken(refreshToken);
  
    return tokenRemoved;
};

/**
 * Generate new AccessToken and RefreshToken
 * !(typeof userData === 'object') condition is added because ts says .verify may return string
 */
const refreshUserToken = async (refreshToken: string) => {
    if (!refreshToken) {      
      throw new AppError(`You are not authorized`, 401);
    }

    const userData = await validateRefreshToken(refreshToken);
    const existingToken = await getToken(refreshToken);

    // Validate refresh token, check for it's existence in DB
    if (!userData || !existingToken || !(typeof userData === 'object')) {
      throw new AppError(`You are not authorized`, 401);
    }

    // In case user data have bee changed
    const user = await User.findById(userData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return new UserDto(user);
};

export { loginUser, logoutUser, refreshUserToken };
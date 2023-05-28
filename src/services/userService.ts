import bcrypt from "bcrypt";
import UserDto from '../dtos/UserDto';
import { User } from '../models/UserModel';
import { removeToken, validateRefreshToken, getToken } from "./tokenService";
import AppError from '../utils/AppError';

const registerUser = async (username: string, email: string, password: string) => {
  try {
    const newUser = new User({
      username,
      email,
      password
    });
  
    const user = await newUser.save();
    
    return new UserDto(user);
  } catch (error: any) {
    if (error.code === 11000) {
      const errorField = Object.keys(error.keyValue)[0];
      throw new AppError(`User with this ${errorField} is already registered `, 409);
    }

    throw error;
  }
};

const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const user = await User.findOne({ $or:[ {'email': usernameOrEmail}, {'username': usernameOrEmail} ]});
    if (!user) {
      throw new AppError('User not found', 401);
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw new AppError('Wrong Password', 401);
    }
    
    return new UserDto(user);
  } catch (error: any) {
    if (error.code === 11000) {
      const errorField = Object.keys(error.keyValue)[0];
      throw new AppError(`User with this ${errorField} is already registered `, 409);
    }

    throw error;
  }
};

const logoutUser = async (refreshToken: string) => {
    if (!refreshToken) {
      throw new AppError(`You are not authorized`, 401);
    }

    const tokenRemoved = await removeToken(refreshToken);
  
    return tokenRemoved;
};

const refreshUserToken = async (refreshToken: string) => {
    if (!refreshToken) {      
      throw new AppError(`You are not authorized`, 401);
    }

    const userData = await validateRefreshToken(refreshToken);
    const existingToken = await getToken(refreshToken);

    // The last condition is added because ts says .verify may return string
    if (!userData || !existingToken || !(typeof userData === 'object')) {
      throw new AppError(`You are not authorized`, 401);
    }

    if (!userData || !existingToken) {
      throw new AppError('You are not authorized', 401);
    }

    // In case user data have bee changed
    const user = await User.findById(userData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return new UserDto(user);
};

const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

export { registerUser, loginUser, logoutUser, refreshUserToken, getAllUsers };
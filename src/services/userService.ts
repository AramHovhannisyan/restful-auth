import UserDto from '../dtos/UserDto';
import { User } from '../models/UserModel';
import AppError from '../utils/AppError';

const createOne = async (username: string, email: string, password: string) => {
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

export { createOne };
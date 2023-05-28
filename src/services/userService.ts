import UserDto from '../dtos/UserDto';
import { User } from '../models/UserModel';
import AppError from '../errorHandling/AppError';

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

const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

export { registerUser, getAllUsers };
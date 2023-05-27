import { User } from '../models/UserModel';

const createOne = async (username: string, email: string, password: string) => {
  const newUser = new User({
    username,
    email,
    password
  });

  const user = await newUser.save();

  return user;
};

export { createOne };
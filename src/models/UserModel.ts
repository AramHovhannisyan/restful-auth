import { Schema, model, connect } from 'mongoose';

interface IUser {
  username: string,
  email: string;
  password: string,
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export { User };
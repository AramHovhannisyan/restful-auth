import { Schema, model, connect } from 'mongoose';

interface UserType {
  username: string,
  email: string;
  password: string,
}

const userSchema = new Schema<UserType>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = model<UserType>('User', userSchema);

export { User };
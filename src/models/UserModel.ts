import { Schema, model, connect } from 'mongoose';

interface UserType {
  username: string,
  email: string;
  password: string,
}

const userSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = model<UserType>('User', userSchema);

export { User };
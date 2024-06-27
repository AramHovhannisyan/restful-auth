import { Schema, model } from 'mongoose';

interface TokenType {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: string,
}

const tokenSchema = new Schema<TokenType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
});

const Token = model<TokenType>('Token', tokenSchema);

export { Token };
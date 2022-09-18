import { EntitySchema } from 'typeorm';
import { User1 } from './user1.entity';

export const UserSchema = new EntitySchema<User1>({
  name: 'User1',
  target: User1,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
});

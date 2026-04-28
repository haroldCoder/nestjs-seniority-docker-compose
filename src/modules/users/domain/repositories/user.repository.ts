import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}

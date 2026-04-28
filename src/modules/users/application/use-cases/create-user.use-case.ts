import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '@users/domain/repositories';
import { User } from '@users/domain/entities';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.userRepository.create(data);
  }
}

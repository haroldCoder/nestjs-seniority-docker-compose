import { Injectable } from '@nestjs/common';
import { UserRepository } from '@users/domain/repositories';
import { User } from '@users/domain/entities';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { FollowRepository } from '@follows/domain/repositories';
import { Follow } from '@follows/domain/entities';
import { FollowAlreadyExistsException } from '../exceptions';

@Injectable()
export class FollowUserUseCase {
  constructor(private readonly followRepository: FollowRepository) { }

  async execute(followerId: number, followingId: number): Promise<Follow> {
    const existingFollow = await this.followRepository.findFollow(followerId, followingId);
    if (existingFollow) {
      throw new FollowAlreadyExistsException(followerId, followingId);
    }

    return this.followRepository.create({
      followerId,
      followingId,
    });
  }
}

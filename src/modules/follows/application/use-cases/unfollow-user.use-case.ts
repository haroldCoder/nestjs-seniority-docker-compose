import { Injectable } from '@nestjs/common';
import { FollowRepository } from '@follows/domain/repositories';
import { FollowNotFoundException } from '../exceptions';

@Injectable()
export class UnfollowUserUseCase {
  constructor(private readonly followRepository: FollowRepository) { }

  async execute(followerId: number, followingId: number): Promise<void> {
    const existingFollow = await this.followRepository.findFollow(followerId, followingId);
    if (!existingFollow) {
      throw new FollowNotFoundException(followerId, followingId);
    }

    await this.followRepository.delete(followerId, followingId);
  }
}

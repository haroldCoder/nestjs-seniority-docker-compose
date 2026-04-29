import { Injectable } from '@nestjs/common';
import { FollowRepository } from '@follows/domain/repositories';
import { Follow } from '@follows/domain/entities';

@Injectable()
export class GetFollowingUseCase {
  constructor(private readonly followRepository: FollowRepository) { }

  async execute(userId: number): Promise<Follow[]> {
    return this.followRepository.findFollowing(userId);
  }
}

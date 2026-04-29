import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  FollowUserUseCase,
  UnfollowUserUseCase,
  GetFollowersUseCase,
  GetFollowingUseCase,
} from '@follows/application/use-cases';
import { CreateFollowDto } from '../dtos';
import { FollowsExceptionFilter } from '../filters';

@Controller()
@UseFilters(FollowsExceptionFilter)
export class FollowController {
  constructor(
    private readonly followUserUseCase: FollowUserUseCase,
    private readonly unfollowUserUseCase: UnfollowUserUseCase,
    private readonly getFollowersUseCase: GetFollowersUseCase,
    private readonly getFollowingUseCase: GetFollowingUseCase,
  ) { }

  @MessagePattern({ cmd: 'follow_user' })
  async follow(@Payload() createFollowDto: CreateFollowDto) {
    return this.followUserUseCase.execute(createFollowDto.followerId, createFollowDto.followingId);
  }

  @MessagePattern({ cmd: 'unfollow_user' })
  async unfollow(@Payload() createFollowDto: CreateFollowDto) {
    return this.unfollowUserUseCase.execute(createFollowDto.followerId, createFollowDto.followingId);
  }

  @MessagePattern({ cmd: 'get_followers' })
  async getFollowers(@Payload() userId: number) {
    return this.getFollowersUseCase.execute(userId);
  }

  @MessagePattern({ cmd: 'get_following' })
  async getFollowing(@Payload() userId: number) {
    return this.getFollowingUseCase.execute(userId);
  }
}

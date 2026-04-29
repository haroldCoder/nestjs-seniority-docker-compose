import { Controller, Post, Delete, Get, Body, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import {
  FollowUserUseCase,
  UnfollowUserUseCase,
  GetFollowersUseCase,
  GetFollowingUseCase,
} from '@follows/application/use-cases';
import { CreateFollowDto } from '../dtos';
import { ConvertCreateFollowDtoToFollowEntityMapper } from '../mappers';
import { FollowsExceptionFilter } from '../filters';

@Controller('follows')
@UseFilters(FollowsExceptionFilter)
export class FollowController {
  constructor(
    private readonly followUserUseCase: FollowUserUseCase,
    private readonly unfollowUserUseCase: UnfollowUserUseCase,
    private readonly getFollowersUseCase: GetFollowersUseCase,
    private readonly getFollowingUseCase: GetFollowingUseCase,
  ) { }

  @Post()
  async follow(@Body() createFollowDto: CreateFollowDto) {
    return this.followUserUseCase.execute(createFollowDto.followerId, createFollowDto.followingId);
  }

  @Delete()
  async unfollow(@Body() createFollowDto: CreateFollowDto) {
    return this.unfollowUserUseCase.execute(createFollowDto.followerId, createFollowDto.followingId);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId', ParseIntPipe) userId: number) {
    return this.getFollowersUseCase.execute(userId);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId', ParseIntPipe) userId: number) {
    return this.getFollowingUseCase.execute(userId);
  }
}

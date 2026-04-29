import { Controller, Post, Delete, Get, Body, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFollowDto } from '@follows/presentation/dtos';

@Controller('api/follows')
export class GatewayFollowsController {
  constructor(
    @Inject('FOLLOWS_SERVICE') private readonly followsClient: ClientProxy,
  ) { }

  @Post()
  async follow(@Body() createFollowDto: CreateFollowDto) {
    return this.followsClient.send({ cmd: 'follow_user' }, createFollowDto);
  }

  @Delete()
  async unfollow(@Body() createFollowDto: CreateFollowDto) {
    return this.followsClient.send({ cmd: 'unfollow_user' }, createFollowDto);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId', ParseIntPipe) userId: number) {
    return this.followsClient.send({ cmd: 'get_followers' }, userId);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId', ParseIntPipe) userId: number) {
    return this.followsClient.send({ cmd: 'get_following' }, userId);
  }
}

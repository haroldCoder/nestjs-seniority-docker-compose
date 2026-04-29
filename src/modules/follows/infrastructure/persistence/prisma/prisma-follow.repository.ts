import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/db/prisma/client';
import { Follow } from '@follows/domain/entities';
import { FollowRepository } from '@follows/domain/repositories';
import { PrismaFollowToFollowEntityMapper } from '@follows/infrastructure/mappers';

@Injectable()
export class PrismaFollowRepository implements FollowRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Omit<Follow, 'createdAt'>): Promise<Follow> {
    const created = await this.prisma.follow.create({
      data: {
        followerId: data.followerId,
        followingId: data.followingId,
      },
    });

    return PrismaFollowToFollowEntityMapper.toDomain(created);
  }

  async delete(followerId: number, followingId: number): Promise<void> {
    await this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async findFollow(followerId: number, followingId: number): Promise<Follow | null> {
    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (!follow) {
      return null;
    }

    return PrismaFollowToFollowEntityMapper.toDomain(follow);
  }

  async findFollowers(userId: number): Promise<Follow[]> {
    const followers = await this.prisma.follow.findMany({
      where: { followingId: userId },
    });

    return followers.map((follow) => PrismaFollowToFollowEntityMapper.toDomain(follow));
  }

  async findFollowing(userId: number): Promise<Follow[]> {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
    });

    return following.map((follow) => PrismaFollowToFollowEntityMapper.toDomain(follow));
  }
}

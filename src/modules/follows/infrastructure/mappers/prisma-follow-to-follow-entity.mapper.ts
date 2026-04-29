import { Follow } from '@follows/domain/entities';
import { Follow as FollowPrisma } from '@prisma/client';

export class PrismaFollowToFollowEntityMapper {
  static toDomain(follow: FollowPrisma): Follow {
    return Follow.create({
      followerId: follow.followerId,
      followingId: follow.followingId,
      createdAt: new Date(follow.createdAt ?? new Date()),
    });
  }
}

import { Follow } from '../entities';

export abstract class FollowRepository {
  abstract create(follow: Omit<Follow, 'createdAt'>): Promise<Follow>;
  abstract delete(followerId: number, followingId: number): Promise<void>;
  abstract findFollow(followerId: number, followingId: number): Promise<Follow | null>;
  abstract findFollowers(userId: number): Promise<Follow[]>;
  abstract findFollowing(userId: number): Promise<Follow[]>;
}

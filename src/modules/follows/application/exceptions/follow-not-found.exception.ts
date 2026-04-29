export class FollowNotFoundException extends Error {
  constructor(followerId: number, followingId: number) {
    super(`User ${followerId} is not following user ${followingId}`);
    this.name = 'FollowNotFoundException';
  }
}

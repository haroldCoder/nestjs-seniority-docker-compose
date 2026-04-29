export class FollowAlreadyExistsException extends Error {
  constructor(followerId: number, followingId: number) {
    super(`User ${followerId} is already following user ${followingId}`);
    this.name = 'FollowAlreadyExistsException';
  }
}

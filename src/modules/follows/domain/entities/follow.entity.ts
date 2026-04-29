export class Follow {
  constructor(
    public readonly followerId: number,
    public readonly followingId: number,
    public readonly createdAt: Date,
  ) { }

  static create(data: {
    followerId: number;
    followingId: number;
    createdAt?: Date;
  }) {
    return new Follow(
      data.followerId,
      data.followingId,
      data.createdAt || new Date(),
    );
  }
}

import { Follow } from './follow.entity';

describe('Follow Entity', () => {
  it('should create a follow instance with valid data', () => {
    const data = {
      followerId: 1,
      followingId: 2,
    };

    const follow = Follow.create(data);

    expect(follow).toBeInstanceOf(Follow);
    expect(follow.followerId).toBe(data.followerId);
    expect(follow.followingId).toBe(data.followingId);
  });

  it('should set default value for createdAt', () => {
    const follow = Follow.create({
      followerId: 1,
      followingId: 2,
    });

    expect(follow.createdAt).toBeInstanceOf(Date);
  });
});

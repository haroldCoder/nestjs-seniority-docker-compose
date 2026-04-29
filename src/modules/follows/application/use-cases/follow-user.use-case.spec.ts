import { Test, TestingModule } from '@nestjs/testing';
import { FollowUserUseCase } from '@follows/application/use-cases';
import { FollowRepository } from '@follows/domain/repositories';
import { Follow } from '@follows/domain/entities';
import { FollowAlreadyExistsException } from '@follows/application/exceptions';

describe('FollowUserUseCase', () => {
  let useCase: FollowUserUseCase;
  let repository: jest.Mocked<FollowRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      findFollow: jest.fn(),
      findFollowers: jest.fn(),
      findFollowing: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowUserUseCase,
        {
          provide: FollowRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<FollowUserUseCase>(FollowUserUseCase);
    repository = module.get(FollowRepository);
  });

  it('should follow a user successfully', async () => {
    const followerId = 1;
    const followingId = 2;

    const followEntity = Follow.create({ followerId, followingId });
    repository.findFollow.mockResolvedValue(null);
    repository.create.mockResolvedValue(followEntity);

    const result = await useCase.execute(followerId, followingId);

    expect(result).toBe(followEntity);
    expect(repository.findFollow).toHaveBeenCalledWith(followerId, followingId);
    expect(repository.create).toHaveBeenCalledWith({ followerId, followingId });
  });

  it('should throw FollowAlreadyExistsException if follow already exists', async () => {
    const followerId = 1;
    const followingId = 2;

    repository.findFollow.mockResolvedValue(Follow.create({ followerId, followingId }));

    await expect(useCase.execute(followerId, followingId)).rejects.toThrow(FollowAlreadyExistsException);
  });
});

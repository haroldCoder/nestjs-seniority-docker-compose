import { Test, TestingModule } from '@nestjs/testing';
import { FollowController } from '@follows/presentation/controllers';
import {
  FollowUserUseCase,
  UnfollowUserUseCase,
  GetFollowersUseCase,
  GetFollowingUseCase,
} from '@follows/application/use-cases';
import { CreateFollowDto } from '@follows/presentation/dtos';
import { Follow } from '@follows/domain/entities';

describe('FollowController', () => {
  let controller: FollowController;
  let followUserUseCase: jest.Mocked<FollowUserUseCase>;

  beforeEach(async () => {
    const mockFollowUserUseCase = {
      execute: jest.fn(),
    };
    const mockUnfollowUserUseCase = {
      execute: jest.fn(),
    };
    const mockGetFollowersUseCase = {
      execute: jest.fn(),
    };
    const mockGetFollowingUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowController],
      providers: [
        { provide: FollowUserUseCase, useValue: mockFollowUserUseCase },
        { provide: UnfollowUserUseCase, useValue: mockUnfollowUserUseCase },
        { provide: GetFollowersUseCase, useValue: mockGetFollowersUseCase },
        { provide: GetFollowingUseCase, useValue: mockGetFollowingUseCase },
      ],
    }).compile();

    controller = module.get<FollowController>(FollowController);
    followUserUseCase = module.get(FollowUserUseCase);
  });

  it('should call FollowUserUseCase and return the follow instance', async () => {
    const dto: CreateFollowDto = {
      followerId: 1,
      followingId: 2,
    };

    const followEntity = Follow.create(dto);
    followUserUseCase.execute.mockResolvedValue(followEntity);

    const result = await controller.follow(dto);

    expect(result).toBe(followEntity);
    expect(followUserUseCase.execute).toHaveBeenCalledWith(dto.followerId, dto.followingId);
  });
});

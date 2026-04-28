import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersUseCase } from './get-users.use-case';
import { UserRepository } from '@users/domain/repositories/user.repository';
import { User } from '@users/domain/entities/user.entity';

describe('GetUsersUseCase', () => {
  let useCase: GetUsersUseCase;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    repository = module.get(UserRepository);
  });

  it('should return a list of users', async () => {
    const users = [
      User.create({ email: 'user1@example.com', password: 'password1', name: 'User 1' }),
      User.create({ email: 'user2@example.com', password: 'password2', name: 'User 2' }),
    ];

    repository.findAll.mockResolvedValue(users);

    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should return an empty list if no users exist', async () => {
    repository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});

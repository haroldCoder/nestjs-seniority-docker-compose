import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { UserRepository } from '@users/domain/repositories/user.repository';
import { ConflictException } from '@nestjs/common';
import { User } from '@users/domain/entities/user.entity';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    repository = module.get(UserRepository);
  });

  it('should create a user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const userEntity = User.create(userData);
    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockResolvedValue(userEntity);

    const result = await useCase.execute(userData);

    expect(result).toBe(userEntity);
    expect(repository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(repository.create).toHaveBeenCalledWith(userData);
  });

  it('should throw ConflictException if email already exists', async () => {
    const userData = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
    };

    repository.findByEmail.mockResolvedValue(User.create(userData));

    await expect(useCase.execute(userData)).rejects.toThrow(ConflictException);
  });
});

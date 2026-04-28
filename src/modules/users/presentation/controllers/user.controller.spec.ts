import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';
import { GetUsersUseCase } from '@users/application/use-cases/get-users.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '@users/domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: jest.Mocked<CreateUserUseCase>;
  let getUsersUseCase: jest.Mocked<GetUsersUseCase>;

  beforeEach(async () => {
    const mockCreateUserUseCase = {
      execute: jest.fn(),
    };
    const mockGetUsersUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: mockCreateUserUseCase,
        },
        {
          provide: GetUsersUseCase,
          useValue: mockGetUsersUseCase,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get(CreateUserUseCase);
    getUsersUseCase = module.get(GetUsersUseCase);
  });

  it('should call CreateUserUseCase and return the created user', async () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const userEntity = User.create(dto);
    createUserUseCase.execute.mockResolvedValue(userEntity);

    const result = await controller.create(dto);

    expect(result).toBe(userEntity);
    expect(createUserUseCase.execute).toHaveBeenCalled();
  });

  it('should call GetUsersUseCase and return the user list', async () => {
    const users = [
      User.create({ email: 'user1@example.com', password: 'password1' }),
    ];

    getUsersUseCase.execute.mockResolvedValue(users);

    const result = await controller.findAll();

    expect(result).toBe(users);
    expect(getUsersUseCase.execute).toHaveBeenCalled();
  });
});

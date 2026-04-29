import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';
import { GetUsersUseCase } from '@users/application/use-cases/get-users.use-case';
import { CreateUserDto } from '../dtos';
import { ConvertCreateUserDtoToUserEntityMapper } from '../mappers';

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) { }

  @MessagePattern({ cmd: 'create_user' })
  async create(@Payload() createUserDto: CreateUserDto) {
    const user = ConvertCreateUserDtoToUserEntityMapper.toDomain(createUserDto);
    return this.createUserUseCase.execute(user);
  }

  @MessagePattern({ cmd: 'get_users' })
  async findAll() {
    return this.getUsersUseCase.execute();
  }
}

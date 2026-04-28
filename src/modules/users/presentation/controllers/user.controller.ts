import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';
import { GetUsersUseCase } from '@users/application/use-cases/get-users.use-case';
import { CreateUserDto } from '../dtos';
import { ConvertCreateUserDtoToUserEntityMapper } from '../mappers';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = ConvertCreateUserDtoToUserEntityMapper.toDomain(createUserDto);
    return this.createUserUseCase.execute(user);
  }

  @Get()
  async findAll() {
    return this.getUsersUseCase.execute();
  }
}

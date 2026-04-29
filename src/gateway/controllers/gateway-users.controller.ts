import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@users/presentation/dtos';

@Controller('api/users')
export class GatewayUsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_user' }, createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }
}

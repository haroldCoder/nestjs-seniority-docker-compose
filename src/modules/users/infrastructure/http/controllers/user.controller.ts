import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case';
import { GetUsersUseCase } from '../../../application/use-cases/get-users.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Get()
    async findAll() {
        return this.getUsersUseCase.execute();
    }
}

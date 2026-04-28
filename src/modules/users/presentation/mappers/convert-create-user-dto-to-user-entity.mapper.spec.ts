import { ConvertCreateUserDtoToUserEntityMapper } from './convert-create-user-dto-to-user-entity.mapper';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '@users/domain/entities/user.entity';

describe('ConvertCreateUserDtoToUserEntityMapper', () => {
  it('should map CreateUserDto to User domain entity', () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = ConvertCreateUserDtoToUserEntityMapper.toDomain(dto);

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(dto.email);
    expect(user.password).toBe(dto.password);
    expect(user.name).toBe(dto.name);
  });
});

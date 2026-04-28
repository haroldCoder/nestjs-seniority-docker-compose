import { CreateUserDto } from "../dtos";
import { User } from "@users/domain/entities/user.entity";

export class ConvertCreateUserDtoToUserEntityMapper {
    static toDomain(createUserDto: CreateUserDto): User {
        return User.create(createUserDto);
    }
}
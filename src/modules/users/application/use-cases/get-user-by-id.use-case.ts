import { UserRepository } from "@users/domain/repositories";
import { User } from "@users/domain/entities";
import { UserNotFoundException } from "../exceptions";

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }
}
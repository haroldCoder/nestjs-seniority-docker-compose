import { CreateFollowDto } from '../dtos';
import { Follow } from '@follows/domain/entities';

export class ConvertCreateFollowDtoToFollowEntityMapper {
  static toDomain(dto: CreateFollowDto): Follow {
    return Follow.create(dto);
  }
}

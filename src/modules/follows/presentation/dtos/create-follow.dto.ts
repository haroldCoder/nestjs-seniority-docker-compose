import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateFollowDto {
  @IsInt({ message: 'FollowerId must be an integer' })
  @IsNotEmpty({ message: 'FollowerId is required' })
  followerId: number;

  @IsInt({ message: 'FollowingId must be an integer' })
  @IsNotEmpty({ message: 'FollowingId is required' })
  followingId: number;
}

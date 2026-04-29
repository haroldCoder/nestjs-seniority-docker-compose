import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@users/users.module';
import { RecipesModule } from '@recipes/recipes.module';
import { FollowsModule } from '@follows/follows.module';

@Module({
  imports: [UsersModule, RecipesModule, FollowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

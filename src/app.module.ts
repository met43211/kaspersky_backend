import { Module } from '@nestjs/common';
import { PrizesModule } from './prizes/prizes.module';
import { SpinsModule } from './spins/spins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, SpinsModule, PrizesModule],
})
export class AppModule {}

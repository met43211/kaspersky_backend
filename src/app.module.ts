import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrizesModule } from './prizes/prizes.module';
import { SpinsModule } from './spins/spins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, SpinsModule, PrizesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

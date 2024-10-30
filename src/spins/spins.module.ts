import { Module } from '@nestjs/common';
import { SpinsService } from './spins.service';
import { SpinsController } from './spins.controller';
import { PrismaService } from 'src/prisma.service';
import { PrizesModule } from 'src/prizes/prizes.module';

@Module({
  controllers: [SpinsController],
  providers: [SpinsService, PrismaService],
  exports: [SpinsService],
  imports: [PrizesModule],
})
export class SpinsModule {}

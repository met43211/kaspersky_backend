import { Module } from '@nestjs/common';
import { SpinsService } from './spins.service';
import { SpinsController } from './spins.controller';
import { PrismaService } from 'src/prisma.service';
import { PrizesModule } from 'src/prizes/prizes.module';
import { GoogleSheetsService } from 'src/google-sheets.service';

@Module({
  controllers: [SpinsController],
  providers: [SpinsService, PrismaService, GoogleSheetsService],
  exports: [SpinsService],
  imports: [PrizesModule],
})
export class SpinsModule {}

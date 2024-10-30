import { Module } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { PrizesController } from './prizes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PrizesController],
  providers: [PrizesService, PrismaService],
  exports: [PrizesService],
})
export class PrizesModule {}

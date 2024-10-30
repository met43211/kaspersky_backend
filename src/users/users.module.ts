import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { SpinsModule } from 'src/spins/spins.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [SpinsModule],
})
export class UsersModule {}

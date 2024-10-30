import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrizesService } from 'src/prizes/prizes.service';
import { EPrizesTypes } from 'src/public-types/prizes-types.type';

@Injectable()
export class SpinsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prizesService: PrizesService,
  ) {}
  async create(userId: number, prizeType: EPrizesTypes) {
    const date = new Date().toISOString();
    const prize = await this.prizesService.getPrizeByPrizeType(prizeType);
    if (!prize) throw new InternalServerErrorException('Can not chose prize');
    await this.prizesService.subtractPrize(prize.itemId);
    await this.prismaService.spin.create({
      data: { prizeId: prize.itemId, userId, date },
    });
    return prize;
  }
}

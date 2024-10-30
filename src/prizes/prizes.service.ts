import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrizesTypesLevels } from './config/prizes-types-levels';
import { PrismaService } from 'src/prisma.service';
import { EPrizesTypes } from 'src/public-types/prizes-types.type';
import { Prize } from '@prisma/client';

@Injectable()
export class PrizesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPrizeByPrizeType(prizeType: EPrizesTypes) {
    const prizeTypeIndex = PrizesTypesLevels.findIndex((type) => type === prizeType);
    const availablePrizesTypes = PrizesTypesLevels.slice(0, prizeTypeIndex);
    const prizes = await this.prismaService.prize.findMany({
      where: { type: { in: availablePrizesTypes } },
    });
    return this.getRandomPrize(prizes);
  }

  getRandomPrize(prizes: Prize[]) {
    const weightedPrizes: Prize[] = [];

    prizes.forEach((prize) => {
      for (let i = 0; i < prize.amount; i++) {
        weightedPrizes.push(prize);
      }
    });

    if (weightedPrizes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * weightedPrizes.length);
    return weightedPrizes[randomIndex];
  }

  async getPrizeByPrizeId(itemId: Prize['itemId']) {
    const prize = await this.prismaService.prize.findUnique({ where: { itemId } });
    if (!prize) throw new NotFoundException('Prize with this id not found');
    return prize;
  }

  async subtractPrize(itemId: Prize['itemId']) {
    const prize = await this.getPrizeByPrizeId(itemId);
    if (prize.amount < 1) throw new InternalServerErrorException('prize amount < 1');
    await this.prismaService.prize.update({
      where: { itemId },
      data: { amount: (prize.amount -= 1) },
    });
  }
}

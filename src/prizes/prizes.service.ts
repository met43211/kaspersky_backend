import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrizesTypesLevels } from './config/prizes-types-levels';
import { PrismaService } from 'src/prisma.service';
import { EPrizesTypes } from 'src/public-types/prizes-types.type';
import { CreatePrizeDto } from './dto/create-prize-dto';
import { UpdatePrizeDto } from './dto/update-prize-dto';

@Injectable()
export class PrizesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPrizeByPrizeType(prizeType: EPrizesTypes) {
    const prizeTypeIndex = PrizesTypesLevels.findIndex((type) => type === prizeType);
    const availablePrizesTypes = PrizesTypesLevels.slice(0, prizeTypeIndex + 1);
    const prizes = await this.prismaService.prize.findMany({
      where: { type: { in: availablePrizesTypes } },
    });
    return this.getRandomPrize(prizes as CreatePrizeDto[]);
  }

  getRandomPrize(prizes: CreatePrizeDto[]) {
    const weightedPrizes: CreatePrizeDto[] = [];

    prizes.forEach((prize) => {
      for (let i = 0; i < prize.amount; i++) {
        weightedPrizes.push(prize);
      }
    });

    if (weightedPrizes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * weightedPrizes.length);
    return weightedPrizes[randomIndex];
  }

  async getPrizeByPrizeId(itemId: CreatePrizeDto['itemId']) {
    try {
      return await this.prismaService.prize.findUnique({ where: { itemId } });
    } catch (_) {
      throw new NotFoundException('Prize with this id not found');
    }
  }

  async subtractPrize(itemId: CreatePrizeDto['itemId']) {
    const prize = await this.getPrizeByPrizeId(itemId);
    if (prize.amount < 1) throw new InternalServerErrorException('prize amount < 1');
    await this.prismaService.prize.update({
      where: { itemId },
      data: { amount: (prize.amount -= 1) },
    });
  }
  async findAll() {
    return await this.prismaService.prize.findMany();
  }
  async create(createPrizeDto: CreatePrizeDto) {
    return await this.prismaService.prize.create({ data: createPrizeDto });
  }
  async update(itemId: CreatePrizeDto['itemId'], updatePrizeDto: UpdatePrizeDto) {
    await this.getPrizeByPrizeId(itemId);
    return await this.prismaService.prize.update({ where: { itemId }, data: updatePrizeDto });
  }
  async remove(itemId: CreatePrizeDto['itemId']) {
    await this.getPrizeByPrizeId(itemId);
    return await this.prismaService.prize.delete({ where: { itemId } });
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleSheetsService } from 'src/google-sheets.service';
import { PrismaService } from 'src/prisma.service';
import { PrizesService } from 'src/prizes/prizes.service';
import { EPrizesTypes } from 'src/public-types/prizes-types.type';
import { formatDate } from './utils/format-date';

@Injectable()
export class SpinsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prizesService: PrizesService,
    private readonly google: GoogleSheetsService,
  ) {}
  async create(userId: number, prizeType: EPrizesTypes) {
    const date = new Date().toISOString();
    const prize = await this.prizesService.getPrizeByPrizeType(prizeType);
    if (!prize) throw new InternalServerErrorException('Can not chose prize');
    await this.prizesService.subtractPrize(prize.itemId);
    const spin = await this.prismaService.spin.create({
      data: { prizeId: prize.itemId, userId, date },
      include: { user: true, prize: { select: { itemId: true, type: true } } },
    });
    await this.google.addRow([
      [...Object.values(spin.user), ...Object.values(spin.prize), formatDate(spin.date)],
    ]);
    return prize;
  }
}

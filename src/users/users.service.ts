import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { SpinsService } from 'src/spins/spins.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly spinsService: SpinsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { phone, email } = createUserDto;
    const { level, ...userData } = createUserDto;
    const existedUserWithSamePhone = await this.getUserByPhone(phone);
    if (existedUserWithSamePhone) {
      if (email === existedUserWithSamePhone.email) {
        if (existedUserWithSamePhone.spins.length < 3) {
          const prize = await this.spinsService.create(existedUserWithSamePhone.id, level);
          return prize;
        } else {
          const ThirdSpinFromTheEnd = new Date(existedUserWithSamePhone.spins.at(-3).date);
          const lastWeekDate = new Date();
          lastWeekDate.setDate(lastWeekDate.getDate() - 7);
          if (ThirdSpinFromTheEnd < lastWeekDate) {
            const prize = await this.spinsService.create(existedUserWithSamePhone.id, level);
            return prize;
          } else {
            throw new BadRequestException('Can not get more than 3 prizes per week');
          }
        }
      } else {
        throw new BadRequestException('Emails are not equal');
      }
    } else {
      const existedUserWithSameEmail = await this.getUserByEmail(email);
      if (existedUserWithSameEmail)
        throw new BadRequestException('User with such email already exist');
      const user = await this.prismaService.user.create({
        data: userData,
        include: { spins: true },
      });
      const prize = await this.spinsService.create(user.id, level);
      return prize;
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: { spins: { include: { prize: true } } },
    });
  }

  async getLeaders() {
    const leaders = await this.prismaService.user.findMany({
      include: { spins: { select: { prizeId: true } } },
      orderBy: { spins: { _count: 'desc' } },
      take: 30,
    });
    const formattedLeaders = leaders.map(({ spins, name, phone, id }) => {
      return {
        prizeId: spins.at(-1).prizeId,
        name,
        id,
        phone: phone.slice(0, 8) + ' ***-**-**',
      };
    });
    return formattedLeaders;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserByPhone(phone: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { phone },
        include: { spins: true },
      });
    } catch (_) {
      return null;
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
        include: { spins: true },
      });
    } catch (_) {
      return null;
    }
  }
}

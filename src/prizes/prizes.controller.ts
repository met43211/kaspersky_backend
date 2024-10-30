import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { CreatePrizeDto } from './dto/create-prize-dto';
import { UpdatePrizeDto } from './dto/update-prize-dto';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post()
  async create(@Body() createPrizeDto: CreatePrizeDto) {
    return await this.prizesService.create(createPrizeDto);
  }
  @Get(':itemId')
  async findOne(@Param('itemId') itemId: CreatePrizeDto['itemId']) {
    return await this.prizesService.getPrizeByPrizeId(itemId);
  }
  @Get()
  async findAll() {
    return await this.prizesService.findAll();
  }
  @Patch(':itemId')
  async update(
    @Param('itemId') itemId: CreatePrizeDto['itemId'],
    @Body() updatePrizeDto: UpdatePrizeDto,
  ) {
    return await this.prizesService.update(itemId, updatePrizeDto);
  }
  @Delete(':itemId')
  async remove(@Param('itemId') itemId: CreatePrizeDto['itemId']) {
    return await this.prizesService.remove(itemId);
  }
}

import { Controller } from '@nestjs/common';
import { SpinsService } from './spins.service';

@Controller('spins')
export class SpinsController {
  constructor(private readonly spinsService: SpinsService) {}
}

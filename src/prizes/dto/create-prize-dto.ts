import { EPrizesTypes } from 'src/public-types/prizes-types.type';

export class CreatePrizeDto {
  itemId: string;
  type: EPrizesTypes;
  amount: number;
}

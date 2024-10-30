import { EPrizesTypes } from 'src/public-types/prizes-types.type';

export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  job: string;
  level: EPrizesTypes;
}

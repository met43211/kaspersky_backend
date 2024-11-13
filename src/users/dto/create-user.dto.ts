import { EPrizesTypes } from 'src/public-types/prizes-types.type';
import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @Matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)
  phone: string;
  @IsString()
  job: string;
  @IsEnum(EPrizesTypes)
  level: EPrizesTypes;
}

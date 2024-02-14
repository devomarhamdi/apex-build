import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsDecimal()
  code: number;

  @IsNotEmpty()
  name: string;
}

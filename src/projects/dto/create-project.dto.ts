import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsDecimal({}, { message: 'Code is not a valid decimal number' })
  @IsNotEmpty({ message: "Code shouldn't be empty" })
  code: number;

  @IsNotEmpty({ message: "Name shouldn't be empty" })
  name: string;
}

import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {},
    {
      message:
        'a minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEmpty()
  profilePic: string;
}

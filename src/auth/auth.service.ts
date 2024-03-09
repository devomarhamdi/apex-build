import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(loginDto: LoginDto): Promise<any> {
  //   const user = await this.userService.findOneByEmail(loginDto.email);
  //   if (user && user.password === loginDto.password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (user && user.password === loginDto.password) {
      const payload = { _id: user._id };
      return { token: this.jwtService.sign(payload), user };
    } else {
      throw new BadRequestException('Email or password is invalid');
    }
  }
}

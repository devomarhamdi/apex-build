import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (user && isMatch) {
      const payload = { user };
      return { token: this.jwtService.sign(payload), user };
    } else {
      throw new BadRequestException('Email or password is invalid');
    }
  }
}

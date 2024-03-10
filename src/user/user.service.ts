import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Checking is the user exist
    const isExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (!isExist) {
      // Prepare the user image
      const userName = `${createUserDto.firstName}+${createUserDto.lastName}`;
      const image = `https://ui-avatars.com/api/?name=${userName}&background=random&size=512`;

      createUserDto.profilePic = image;

      // Hasing the password
      const saltOrRounds = 10;
      const password = createUserDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      createUserDto.password = hash;

      return await this.userModel.create(createUserDto);
    } else {
      throw new UnauthorizedException('This user already exists');
    }
  }

  async findAll() {
    const user = await this.userModel.find();

    if (user.length === 0) {
      return { message: 'There is no users found' };
    }

    const response = {
      results: user.length,
      data: user,
    };
    return response;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

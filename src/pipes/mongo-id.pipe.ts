import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any) {
    const isValid = mongoose.Types.ObjectId.isValid(value);

    if (!isValid) {
      throw new BadRequestException('Please use a valid id');
    }

    return value;
  }
}

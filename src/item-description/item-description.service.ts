import { Injectable } from '@nestjs/common';
import { CreateItemDescriptionDto } from './dto/create-item-description.dto';
import { UpdateItemDescriptionDto } from './dto/update-item-description.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDescription } from './schemas/item-description.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemDescriptionService {
  constructor(
    @InjectModel(ItemDescription.name) private itemModel: Model<ItemDescription>,
  ) {}

  create(createItemDescriptionDto: CreateItemDescriptionDto) {
    return 'This action adds a new itemDescription';
  }

  findAll() {
    return `This action returns all itemDescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemDescription`;
  }

  update(id: number, updateItemDescriptionDto: UpdateItemDescriptionDto) {
    return `This action updates a #${id} itemDescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemDescription`;
  }
}

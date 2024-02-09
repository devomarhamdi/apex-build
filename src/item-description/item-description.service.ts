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

  async create(createItemDescriptionDto: CreateItemDescriptionDto) {
    return await this.itemModel.create(createItemDescriptionDto);
  }

  async findAll() {
    return await this.itemModel.find();
  }

  async findOne(id: string) {
    return await this.itemModel.findById(id);
  }

  async update(id: string, updateItemDescriptionDto: UpdateItemDescriptionDto) {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDescriptionDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.itemModel.findByIdAndDelete(id);
  }
}

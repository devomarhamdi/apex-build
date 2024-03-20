import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDescriptionDto } from './dto/create-item-description.dto';
import { UpdateItemDescriptionDto } from './dto/update-item-description.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDescription } from '../schemas/item-description.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemDescriptionService {
  constructor(
    @InjectModel(ItemDescription.name)
    private itemModel: Model<ItemDescription>,
  ) {}

  async create(createItemDescriptionDto: CreateItemDescriptionDto) {
    return await this.itemModel.create(createItemDescriptionDto);
  }

  async findAll() {
    const items = await this.itemModel.find();

    if (items.length === 0) {
      return { message: 'There is no items found' };
    }

    const response = {
      results: items.length,
      data: items,
    };
    return response;
  }

  async findOne(id: string) {
    const item = await this.itemModel.findById(id);

    if (!item) {
      throw new NotFoundException('No item found');
    }
    return item;
  }

  async update(id: string, updateItemDescriptionDto: UpdateItemDescriptionDto) {
    const item = await this.itemModel.findById(id);

    if (!item) {
      throw new NotFoundException('No item found');
    }

    return await this.itemModel.findByIdAndUpdate(id, updateItemDescriptionDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const item = await this.itemModel.findById(id);

    if (!item) {
      throw new NotFoundException('No item found');
    }

    return await this.itemModel.findByIdAndDelete(id);
  }
}

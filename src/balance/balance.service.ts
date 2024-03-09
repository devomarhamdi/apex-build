import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from 'src/schemas/balance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name)
    private balanceModel: Model<Balance>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto) {
    if (createBalanceDto.good > 0) {
      createBalanceDto.actQTY = createBalanceDto.good;
    }

    if (createBalanceDto.good === 0) {
      createBalanceDto.actQTY = 0;
    }
    createBalanceDto.totQTY =
      createBalanceDto.good +
      createBalanceDto.maintenance +
      createBalanceDto.waste;

    return await this.balanceModel.create(createBalanceDto);
  }

  async findAll() {
    const balance = await this.balanceModel.find().populate({
      path: 'itemDescription',
      select: ['itemDescription', 'code', 'Weight', '-_id'],
    });

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    const response = {
      results: balance.length,
      data: balance,
    };

    return response;
  }

  async findOne(id: string) {
    const balance = await this.balanceModel.findById(id).populate({
      path: 'itemDescription',
    });

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    return balance;
  }

  async findItemBalance(id) {
    const balance = await this.balanceModel.findOne({ itemDescription: id });

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    return balance;
  }

  async update(id: string, updateBalanceDto: UpdateBalanceDto) {
    if (updateBalanceDto.good > 0) {
      updateBalanceDto.actQTY = updateBalanceDto.good;
    }

    if (updateBalanceDto.good === 0) {
      updateBalanceDto.actQTY = 0;
    }
    if (
      updateBalanceDto.good &&
      updateBalanceDto.maintenance &&
      updateBalanceDto.waste
    ) {
      updateBalanceDto.totQTY =
        updateBalanceDto.good +
        updateBalanceDto.maintenance +
        updateBalanceDto.waste;
    }

    return await this.balanceModel.findByIdAndUpdate(id, updateBalanceDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const balance = await this.balanceModel.findByIdAndDelete(id);

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    return balance;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    // Checking if there is a balance already for the item
    const isExist = await this.balanceModel.findOne({
      itemDescription: createBalanceDto.itemDescription,
    });

    if (isExist) {
      throw new BadRequestException('There is an existing balance for this Item');
    } else {
      // Checking is value greater than 0
      const dto = createBalanceDto;
      if (dto.good > 0 && dto.maintenance > 0 && dto.waste > 0) {
        // Creating the balance
        if (dto.good > 0) {
          dto.actQTY = dto.good;
        }

        if (dto.good === 0) {
          dto.actQTY = 0;
        }
        dto.totQTY = dto.good + dto.maintenance + dto.waste;

        return await this.balanceModel.create(createBalanceDto);
      } else {
        throw new BadRequestException(
          'There must not be a negative value in the conditions',
        );
      }
    }
  }

  async findAll() {
    const balance = await this.balanceModel.find().populate({
      path: 'itemDescription',
      select: ['itemDescription', 'code', 'Weight', '-_id'],
    });

    if (balance.length === 0) {
      return { message: 'There is no balance found' };
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
    const balance = await this.balanceModel.findById(id);

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    const dto = updateBalanceDto;

    if (dto.good >= 0 && dto.maintenance >= 0 && dto.waste >= 0) {
      // Creating the balance
      if (dto.good > 0) {
        dto.actQTY = dto.good;
      }

      if (dto.good === 0) {
        dto.actQTY = 0;
      }
      dto.totQTY = dto.good + dto.maintenance + dto.waste;

      return await this.balanceModel.findByIdAndUpdate(id, updateBalanceDto, {
        new: true,
      });
    } else {
      throw new BadRequestException(
        'There must not be a negative or missing values in the conditions',
      );
    }
  }

  async remove(id: string) {
    const balance = await this.balanceModel.findByIdAndDelete(id);

    if (!balance) {
      throw new NotFoundException('No balance found');
    }

    return balance;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from 'src/schemas/balance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/schemas/project.schema';
import { ItemDescription } from 'src/schemas/item-description.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name)
    private balanceModel: Model<Balance>,
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @InjectModel(ItemDescription.name)
    private itemModel: Model<ItemDescription>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto) {
    // Checking if the project is exist
    const project = await this.projectModel.findById(createBalanceDto.project);
    const itemDescription = await this.itemModel.findById(
      createBalanceDto.itemDescription,
    );
    if (project && itemDescription) {
      // Checking if there is a balance already for the item
      const isExist = await this.balanceModel.findOne({
        itemDescription: createBalanceDto.itemDescription,
        project,
      });

      if (isExist) {
        throw new BadRequestException(
          'There is an existing balance for this Item to this Project',
        );
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
    } else {
      throw new NotFoundException('No project or item found');
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

  async findItemBalance(itemId, projectId) {
    const balance = await this.balanceModel.findOne({
      itemDescription: itemId,
      project: projectId,
    });
    // const item = await this.itemModel.findById(itemId);
    // const project = await this.projectModel.findById(projectId);

    if (!balance) {
      // throw new NotFoundException(
      //   `No balance found for this item: ${item.itemDescription} and this project: ${project.name}, Please create one first`,
      // );
      return await this.balanceModel.create({
        itemDescription: itemId,
        project: projectId,
        good: 1000,
        maintenance: 1000,
        waste: 1000,
        actQTY: 1000,
        totQTY: 3000,
      });
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

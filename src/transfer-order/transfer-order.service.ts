import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TransferOrder } from '../schemas/transfer-order.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransferOrderService {
  constructor(
    @InjectModel(TransferOrder.name)
    private transferModel: Model<TransferOrder>,
  ) {}

  async create(createTransferOrderDto: CreateTransferOrderDto) {
    //the transfer id can't be done bec the mongoid
    const itemDescriptionInitial = createTransferOrderDto.itemDescription;
    const itemConditionInitial = createTransferOrderDto.itemCondition.charAt(0);
    const driverNameInitial = createTransferOrderDto.driverName.charAt(0);
    const transferId = `${itemDescriptionInitial}-${itemConditionInitial}-${driverNameInitial}`;

    createTransferOrderDto.transferId = transferId;
    return await this.transferModel.create(createTransferOrderDto);
  }

  async findAll() {
    const orders = await this.transferModel
      .find()
      .populate({
        path: 'itemDescription',
        select: ['itemDescription', 'code', 'Weight', '-_id'],
      })
      .populate({
        path: 'fromProject',
        select: ['name', '-_id'],
      })
      .populate({
        path: 'toProject',
        select: ['name', '-_id'],
      });

    if (!orders) {
      throw new NotFoundException('No orders found');
    }

    const response = {
      results: orders.length,
      data: orders,
    };

    return response;
  }

  async findOne(id: string) {
    const order = await this.transferModel
      .findById(id)
      .populate({
        path: 'itemDescription',
        // select: ['itemDescription', 'code', 'Weight', '-_id'],
      })
      .populate({
        path: 'fromProject',
        // select: ['name', '-_id'],
      })
      .populate({
        path: 'toProject',
        // select: ['name', '-_id'],
      });

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return order;
  }

  async update(id: string, updateTransferOrderDto: UpdateTransferOrderDto) {
    const order = await this.transferModel.findByIdAndUpdate(
      id,
      updateTransferOrderDto,
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return order;
  }

  async remove(id: string) {
    const order = await this.transferModel.findByIdAndDelete(id);

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return order;
  }
}

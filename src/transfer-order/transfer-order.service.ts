import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TransferOrder } from '../schemas/transfer-order.schema';
import { Model } from 'mongoose';
import { ItemDescriptionService } from 'src/item-description/item-description.service';
import { BalanceService } from 'src/balance/balance.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TransferOrderService {
  constructor(
    @InjectModel(TransferOrder.name)
    private transferModel: Model<TransferOrder>,
    private readonly itemDescriptionService: ItemDescriptionService,
    private readonly projectService: ProjectsService,
    private balanceService: BalanceService,
  ) {}

  //The performence will not be very effiecnt
  async create(createTransferOrderDto: CreateTransferOrderDto) {
    // 1- Getting all the required fields
    const itemDescription = await this.itemDescriptionService.findOne(
      createTransferOrderDto.itemDescription.toString(),
    );

    const balance = await this.balanceService.findItemBalance(
      itemDescription._id,
    );

    const fromProject = await this.projectService.findOne(
      createTransferOrderDto.fromProject.toString(),
    );

    const toProject = await this.projectService.findOne(
      createTransferOrderDto.toProject.toString(),
    );

    // 2- Increaseing the order number
    const latestOrder = await this.transferModel
      .findOne()
      .sort('-orderNo')
      .exec();
    const orderNo = latestOrder ? latestOrder.orderNo + 1 : 1;

    createTransferOrderDto.orderNo = orderNo;

    // 3- Making the transferId
    const fromProjectCode = fromProject.name.slice(0, 2);
    const toProjectCode = toProject.name.slice(0, 2);
    const transferDateObject = new Date(createTransferOrderDto.transferDate);
    const month = transferDateObject.getMonth() + 1;
    const year = transferDateObject.getFullYear();

    const transferId = `${fromProjectCode}-${toProjectCode}-${month}-${year}-${orderNo}`;

    createTransferOrderDto.transferId = transferId;

    // 4- Handling the Balance
    if (createTransferOrderDto.itemCondition === 'good') {
      if (balance.good > 0 && createTransferOrderDto.quantity <= balance.good) {
        balance.good = balance.good - createTransferOrderDto.quantity;
        balance.actQTY = balance.actQTY - createTransferOrderDto.quantity;
        balance.totQTY = balance.totQTY - createTransferOrderDto.quantity;
      } else {
        throw new BadRequestException(
          `There is no enough good balance. The remaining is ${balance.good} items`,
        );
      }
    } else if (createTransferOrderDto.itemCondition === 'maintenance') {
      if (
        balance.maintenance > 0 &&
        createTransferOrderDto.quantity <= balance.maintenance
      ) {
        balance.maintenance =
          balance.maintenance - createTransferOrderDto.quantity;
        balance.totQTY = balance.totQTY - createTransferOrderDto.quantity;
      } else {
        throw new BadRequestException(
          `There is no enough maintenance balance. The remaining is ${balance.maintenance} items`,
        );
      }
    } else {
      if (
        balance.waste > 0 &&
        createTransferOrderDto.quantity <= balance.waste
      ) {
        balance.waste = balance.waste - createTransferOrderDto.quantity;
        balance.totQTY = balance.totQTY - createTransferOrderDto.quantity;
      } else {
        throw new BadRequestException(
          `There is no enough waste balance. The remaining is ${balance.waste} items`,
        );
      }
    }
    await balance.save();

    return await this.transferModel.create(createTransferOrderDto);
  }

  async createMany(createTransferOrderDtos: CreateTransferOrderDto[]) {
    const orders = [];

    for (const createTransferOrderDto of createTransferOrderDtos) {
      // Getting all the required fields
      const itemDescription = await this.itemDescriptionService.findOne(
        createTransferOrderDto.itemDescription.toString(),
      );

      const balance = await this.balanceService.findItemBalance(
        itemDescription._id,
      );

      const fromProject = await this.projectService.findOne(
        createTransferOrderDto.fromProject.toString(),
      );

      const toProject = await this.projectService.findOne(
        createTransferOrderDto.toProject.toString(),
      );

      // Increasing the order number
      const latestOrder = await this.transferModel
        .findOne()
        .sort('-orderNo')
        .exec();
      const orderNo = latestOrder ? latestOrder.orderNo + 1 : 1;

      createTransferOrderDto.orderNo = orderNo;

      // Making the transferId
      const fromProjectCode = fromProject.name.slice(0, 2);
      const toProjectCode = toProject.name.slice(0, 2);
      const transferDateObject = new Date(createTransferOrderDto.transferDate);
      const month = transferDateObject.getMonth() + 1;
      const year = transferDateObject.getFullYear();

      const transferId = `${fromProjectCode}-${toProjectCode}-${month}-${year}-${orderNo}`;

      createTransferOrderDto.transferId = transferId;

      // Handling the Balance
      if (createTransferOrderDto.itemCondition === 'good') {
        if (
          balance.good > 0 &&
          createTransferOrderDto.quantity <= balance.good
        ) {
          balance.good -= createTransferOrderDto.quantity;
          balance.actQTY -= createTransferOrderDto.quantity;
          balance.totQTY -= createTransferOrderDto.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough good balance. The remaining is ${balance.good} items`,
          );
        }
      } else if (createTransferOrderDto.itemCondition === 'maintenance') {
        if (
          balance.maintenance > 0 &&
          createTransferOrderDto.quantity <= balance.maintenance
        ) {
          balance.maintenance -= createTransferOrderDto.quantity;
          balance.totQTY -= createTransferOrderDto.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough maintenance balance. The remaining is ${balance.maintenance} items`,
          );
        }
      } else {
        if (
          balance.waste > 0 &&
          createTransferOrderDto.quantity <= balance.waste
        ) {
          balance.waste -= createTransferOrderDto.quantity;
          balance.totQTY -= createTransferOrderDto.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough waste balance. The remaining is ${balance.waste} items`,
          );
        }
      }
      await balance.save();

      // Creating the order
      orders.push(await this.transferModel.create(createTransferOrderDto));
    }

    const res = {
      results: orders.length,
      data: orders,
    };

    return res;
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

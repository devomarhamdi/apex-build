import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TransferOrder, orderStatus } from '../schemas/transfer-order.schema';
import { Model } from 'mongoose';
import { ItemDescriptionService } from 'src/item-description/item-description.service';
import { BalanceService } from 'src/balance/balance.service';
import { ProjectsService } from 'src/projects/projects.service';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransferOrderService {
  constructor(
    @InjectModel(TransferOrder.name)
    private transferModel: Model<TransferOrder>,
    private readonly itemDescriptionService: ItemDescriptionService,
    private readonly projectService: ProjectsService,
    private balanceService: BalanceService,
    private configService: ConfigService,
  ) {}

  async create(createTransferOrderDto: CreateTransferOrderDto, image: any) {
    const { transferDate, fromProject, toProject, orders } = createTransferOrderDto;

    // Process the image as needed (e.g., store in database, save to disk, etc.)
    const imageUrl = image.filename;
    // Iterate over each order
    for (const order of orders) {
      // Finding all the required fields for each order
      const itemDescription = await this.itemDescriptionService.findOne(
        order.itemDescription.toString(),
      );
      const fromProjectObj = await this.projectService.findOne(fromProject.toString());
      const toProjectObj = await this.projectService.findOne(toProject.toString());

      // Handle project name validation for each order
      if (fromProject === toProject) {
        throw new BadRequestException(
          'The From project cannot be the same as to project',
        );
      }

      // Increase order number for each order
      const latestOrder = await this.transferModel.findOne().sort('-orderNo').exec();
      const orderNo = latestOrder ? latestOrder.orderNo + 1 : 1;

      // Create transferId for each order
      const fromProjectCode = fromProjectObj.name.slice(0, 2);
      const toProjectCode = toProjectObj.name.slice(0, 2);
      const transferDateObject = new Date(transferDate);
      const month = transferDateObject.getMonth() + 1;
      const year = transferDateObject.getFullYear();
      const transferId = `${fromProjectCode}-${toProjectCode}-${month}-${year}-${orderNo}`;

      // Initialize order status for each order
      order.orderNo = orderNo;
      order.transferId = transferId;
      order.status = orderStatus.processing;

      // Find item balances for each order
      const fromBalance = await this.balanceService.findItemBalance(
        itemDescription._id,
        fromProjectObj._id,
      );
      const toBalance = await this.balanceService.findItemBalance(
        itemDescription._id,
        toProjectObj._id,
      );

      // Handle balance adjustment for each order
      if (order.itemCondition === 'good') {
        // Adjust balances for good condition
        if (fromBalance.good > 0 && order.quantity <= fromBalance.good) {
          // Update balances
          fromBalance.good -= order.quantity;
          toBalance.good += +order.quantity;
          fromBalance.actQTY = Math.max(fromBalance.actQTY - order.quantity, 0);
          toBalance.actQTY += +order.quantity;
          fromBalance.totQTY = Math.max(fromBalance.totQTY - order.quantity, 0);
          toBalance.totQTY += +order.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough good balance. The remaining is ${fromBalance.good} items`,
          );
        }
      } else if (order.itemCondition === 'maintenance') {
        // Adjust balances for maintenance condition
        if (fromBalance.maintenance > 0 && order.quantity <= fromBalance.maintenance) {
          // Update balances
          fromBalance.maintenance -= order.quantity;
          toBalance.maintenance += +order.quantity;
          fromBalance.totQTY = Math.max(fromBalance.totQTY - order.quantity, 0);
          toBalance.totQTY += +order.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough maintenance balance. The remaining is ${fromBalance.maintenance} items`,
          );
        }
      } else {
        // Adjust balances for waste condition
        if (fromBalance.waste > 0 && order.quantity <= fromBalance.waste) {
          // Update balances
          fromBalance.waste -= order.quantity;
          toBalance.waste += +order.quantity;
          fromBalance.totQTY = Math.max(fromBalance.totQTY - order.quantity, 0);
          toBalance.totQTY += +order.quantity;
        } else {
          throw new BadRequestException(
            `There is not enough waste balance. The remaining is ${fromBalance.waste} items`,
          );
        }
      }

      // Add image URL to order data
      order.image = imageUrl;

      // Save balance changes for each order
      await fromBalance.save();
      await toBalance.save();
    }

    // Create transfer orders for all orders
    const createdOrders = await this.transferModel.create(orders);
    return { results: createdOrders.length, data: createdOrders };
  }

  async findAll() {
    const orders = await this.transferModel
      .find()
      .populate({
        path: 'itemDescription',
        select: ['itemDescription', 'code', 'Weight', 'name', '-_id'],
      })
      .populate({
        path: 'fromProject',
        select: ['name', '-_id'],
      })
      .populate({
        path: 'toProject',
        select: ['name', '-_id'],
      })
      .sort('-createdAt');

    if (orders.length === 0) {
      return { message: 'There is no orders found' };
    }

    const response = {
      results: orders.length,
      data: orders,
    };

    return response;
  }

  async income() {
    const orders = await this.transferModel
      .find({ status: orderStatus.processing })
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
    const order = await this.transferModel.findById(id);

    if (!order) {
      throw new NotFoundException('No order found');
    }
    // Getting all the required fields

    if (updateTransferOrderDto.fromProject) {
      const fromProject = await this.projectService.findOne(
        updateTransferOrderDto.fromProject.toString(),
      );
      updateTransferOrderDto.fromProject = fromProject;
    }
    if (updateTransferOrderDto.toProject) {
      const toProject = await this.projectService.findOne(
        updateTransferOrderDto.toProject.toString(),
      );
      updateTransferOrderDto.toProject = toProject;
    }

    return await this.transferModel.findByIdAndUpdate(id, updateTransferOrderDto, {
      new: true,
    });
  }

  async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto) {
    const order = await this.transferModel.findById(id);

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return await this.transferModel.findByIdAndUpdate(id, updateIncomeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const order = await this.transferModel.findByIdAndDelete(id);

    if (!order) {
      throw new NotFoundException('No order found');
    }

    return order;
  }
}

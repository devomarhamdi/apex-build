import { Module } from '@nestjs/common';
import { TransferOrderService } from './transfer-order.service';
import { TransferOrderController } from './transfer-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransferOrder,
  TransferOrderSchema,
} from '../schemas/transfer-order.schema';
import { ItemDescriptionModule } from 'src/item-description/item-description.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransferOrder.name, schema: TransferOrderSchema },
    ]),
    ItemDescriptionModule,
  ],
  controllers: [TransferOrderController],
  providers: [TransferOrderService],
})
export class TransferOrderModule {}

import { Module } from '@nestjs/common';
import { TransferOrderService } from './transfer-order.service';
import { TransferOrderController } from './transfer-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransferOrder,
  TransferOrderSchema,
} from './schema/transfer-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransferOrder.name, schema: TransferOrderSchema },
    ]),
  ],
  controllers: [TransferOrderController],
  providers: [TransferOrderService],
})
export class TransferOrderModule {}

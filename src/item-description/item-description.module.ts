import { Module } from '@nestjs/common';
import { ItemDescriptionService } from './item-description.service';
import { ItemDescriptionController } from './item-description.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ItemDescription,
  itemDescriptionSchema,
} from '../schemas/item-description.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDescription.name, schema: itemDescriptionSchema },
    ]),
  ],
  controllers: [ItemDescriptionController],
  providers: [ItemDescriptionService],
  exports: [ItemDescriptionService],
})
export class ItemDescriptionModule {}

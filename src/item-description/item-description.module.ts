import { Module } from '@nestjs/common';
import { ItemDescriptionService } from './item-description.service';
import { ItemDescriptionController } from './item-description.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemDescription, itemDescriptionSchema } from './schema/item-description.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDescription.name, schema: itemDescriptionSchema },
    ]),
  ],
  controllers: [ItemDescriptionController],
  providers: [ItemDescriptionService],
})
export class ItemDescriptionModule {}

import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from 'src/schemas/balance.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import {
  ItemDescription,
  itemDescriptionSchema,
} from 'src/schemas/item-description.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Balance.name, schema: BalanceSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: ItemDescription.name, schema: itemDescriptionSchema },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}

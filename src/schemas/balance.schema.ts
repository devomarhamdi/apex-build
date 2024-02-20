import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';

@Schema({ timestamps: true })
export class Balance {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemDescription',
    required: true,
  })
  itemDescription: ItemDescription;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  good: number;

  @Prop({ required: true })
  maintenance: number;

  @Prop({ required: true })
  waste: number;

  @Prop()
  totQTY: number;

  @Prop()
  actQTY: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  fromProject: Project;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);

// BalanceSchema.pre('save', function (next) {
//   this.totQTY = this.good + this.maintenance + this.waste;
//   next();
// });

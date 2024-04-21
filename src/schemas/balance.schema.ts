import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ItemDescription } from './item-description.schema';
import { Project } from './project.schema';

@Schema({ timestamps: true })
export class Balance {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemDescription',
    required: true,
  })
  itemDescription: ItemDescription;

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
  project: Project;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);

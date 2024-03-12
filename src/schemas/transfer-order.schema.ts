import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';

export enum itemCondition {
  good = 'good',
  maintenance = 'maintenance',
  waste = 'waste',
}

export enum status {
  processing = 'processing',
  unmatched = 'unmatched',
  done = 'done',
}

@Schema({ timestamps: true })
export class TransferOrder {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemDescription',
    required: true,
  })
  itemDescription: ItemDescription;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  transferId: string;

  @Prop({ enum: ['good', 'maintenance', 'waste'] })
  itemCondition: itemCondition;

  @Prop({ default: Date.now() })
  transferDate: Date;

  @Prop({ required: true })
  driverName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  fromProject: Project;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  toProject: Project;

  @Prop()
  orderNo: number;

  @Prop({ enum: ['processing', 'unmatched', 'done'] })
  status: status;
}

export const TransferOrderSchema = SchemaFactory.createForClass(TransferOrder);

// TransferOrderSchema.pre('save', function(next){

// })

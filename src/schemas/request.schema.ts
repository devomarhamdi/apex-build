import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemDescription } from './item-description.schema';
import mongoose from 'mongoose';
import { itemCondition } from './transfer-order.schema';
import { Project } from './project.schema';

export enum requestStatus {
  processing = 'processing',
  cancelled = 'cancelled',
  done = 'done',
}

@Schema({ timestamps: true })
export class Request {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemDescription',
    required: true,
  })
  itemDescription: ItemDescription;

  @Prop()
  quantity: number;

  @Prop({ enum: ['good', 'maintenance', 'waste'] })
  itemCondition: itemCondition;

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
  requestNo: number;

  @Prop({ enum: ['processing', 'cancelled', 'done'] })
  status: requestStatus;

  @Prop()
  activity: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

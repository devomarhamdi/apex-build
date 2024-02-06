import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ItemDescription {
  @Prop({ required: true })
  itemDescription: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  Weight: string;
}

export const itemDescriptionSchema = SchemaFactory.createForClass(ItemDescription);

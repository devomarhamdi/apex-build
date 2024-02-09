import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ItemDescription {
  @Prop({ required: true })
  itemDescription: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  Weight: number;
}

export const itemDescriptionSchema = SchemaFactory.createForClass(ItemDescription);

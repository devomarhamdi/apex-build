import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ItemDescription {
  @Prop({ required: true })
  itemDescription: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  Weight: number;

  @Prop()
  sellingPrice: number;

  @Prop()
  purchasingPrice: number;

  @Prop()
  rentingPrice: number;

  @Prop()
  good: number;

  @Prop()
  maintenance: number;

  @Prop()
  waste: number;

  @Prop()
  totQTY: number;

  @Prop()
  actQTY: number;
}

export const itemDescriptionSchema = SchemaFactory.createForClass(ItemDescription);

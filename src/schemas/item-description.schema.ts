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

  @Prop()
  name: string;
}

// Define a pre-save hook to concatenate itemDescription and code into name
const itemDescriptionSchema = SchemaFactory.createForClass(ItemDescription);

itemDescriptionSchema.pre('save', function (next) {
  // Check if itemDescription and code are present
  if (this.itemDescription && this.code) {
    // Concatenate itemDescription and code and store in name field
    this.name = `${this.itemDescription} - ${this.code}`;
  }
  next();
});

export { itemDescriptionSchema };

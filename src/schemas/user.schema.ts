import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  profilePic: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

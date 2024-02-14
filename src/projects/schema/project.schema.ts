import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

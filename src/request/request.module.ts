import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from 'src/schemas/request.schema';
import { ItemDescriptionModule } from 'src/item-description/item-description.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    ItemDescriptionModule,
    ProjectsModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}

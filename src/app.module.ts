import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemDescriptionModule } from './item-description/item-description.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:AytzbgatCSMEq2lJ@brainwave-cluster.vwkgglh.mongodb.net/apex-build',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemDescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

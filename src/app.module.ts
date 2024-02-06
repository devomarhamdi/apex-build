import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemDescriptionModule } from './item-description/item-description.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemDescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

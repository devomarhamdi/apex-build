import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemDescriptionModule } from './item-description/item-description.module';
import { ProjectsModule } from './projects/projects.module';
import { TransferOrderModule } from './transfer-order/transfer-order.module';
import { BalanceModule } from './balance/balance.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'env.validation';
import { RequestModule } from './request/request.module';
import { FileUploadInterceptor } from './file-upload-interceptor';
import { MulterModule } from '@nestjs/platform-express';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ItemDescriptionModule,
    ProjectsModule,
    TransferOrderModule,
    BalanceModule,
    AuthModule,
    UserModule,
    RequestModule,
    MulterModule.registerAsync({
      useClass: FileUploadInterceptor,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

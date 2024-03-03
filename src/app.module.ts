import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemDescriptionModule } from './item-description/item-description.module';
import { ProjectsModule } from './projects/projects.module';
import { TransferOrderModule } from './transfer-order/transfer-order.module';
import { BalanceModule } from './balance/balance.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:AytzbgatCSMEq2lJ@brainwave-cluster.vwkgglh.mongodb.net/apex-build',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemDescriptionModule,
    ProjectsModule,
    TransferOrderModule,
    BalanceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

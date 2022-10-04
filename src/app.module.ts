import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ProductListGateway } from './products/product-list.gateway';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testafg'),
    ProductsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService, ProductListGateway],
})
export class AppModule {}

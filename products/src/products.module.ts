import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product,ProductSchema  } from './schemas/product.schema';
import { ProductListGateway } from './product-list.gateway';
import { ProductDetailGateway } from './product-detail.gateway';

@Module({
  providers: [ProductsService, ProductListGateway, ProductDetailGateway],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testafg'),
    MongooseModule.forFeature([{
      name : Product.name,
      schema : ProductSchema
    }])
  ],
  exports: [ProductsService]
})
export class ProductsModule {}

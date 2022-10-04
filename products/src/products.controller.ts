import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('api/product')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

  @Get()
  async index() {
    var data = await this.service.findAll()
    return {
        statusCode: 200,
        data: data
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    var data = await this.service.findOne(id);
    return {
        statusCode: 200,
        data: data
    };
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    var data = await this.service.create(createProductDto);
    return {
        statusCode: 200,
        data: data
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    var data = await this.service.update(id, updateProductDto)
    return {
        statusCode: 201,
        data: data
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    var data =  await this.service.delete(id);
    return {
        statusCode: 201,
        message: 'delete product successfuly'
    };
  }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { Socket, io } from "socket.io-client";

@Controller('api/transaction')
export class TransactionsController {
    constructor(
      private readonly service: TransactionsService,
      
    ) {}

  private socket: Socket
  private product: any = {}

  @Get()
  async index() {
    this.socket = io("http://127.0.0.1:8000")

    var data = await this.service.findAll()
    var response = []

    data.forEach(value => {
      var withProduct : any = {};
      withProduct.qty = value.qty
      withProduct.total_price = value.total_price
      withProduct.payment_method = value.payment_method
      withProduct.createdAt = value.createdAt
      withProduct.deletedAt = value.deletedAt

      this.socket.emit('product_detail', {productId: value.product_id})
      this.socket.on('product_detail', ({ res }) => {
        this.product = res
        // Logger.log(this.product)
      })
      withProduct.product = this.product
       
      response.push(withProduct)
      // console.log(product)
    })
    return {
        statusCode: 200,
        data: response
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
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    var data = await this.service.create(createTransactionDto);
    return {
        statusCode: 200,
        data: data
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    var data = await this.service.update(id, updateTransactionDto)
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

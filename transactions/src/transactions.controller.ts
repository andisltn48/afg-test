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
      var newValue : any = value

      withProduct._id = newValue._id
      withProduct.qty = newValue.qty
      withProduct.total_price = newValue.total_price
      withProduct.payment_method = newValue.payment_method
      withProduct.createdAt = newValue.createdAt
      withProduct.deletedAt = newValue.deletedAt

      this.socket.emit('product_detail', {productId: newValue.product_id})
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
    
    this.socket = io("http://127.0.0.1:8000")
    var data = await this.service.findOne(id);
    var withProduct : any = {};
    var newValue : any = data

    withProduct._id = newValue._id
    withProduct.qty = newValue.qty
    withProduct.total_price = newValue.total_price
    withProduct.payment_method = newValue.payment_method
    withProduct.createdAt = newValue.createdAt
    withProduct.deletedAt = newValue.deletedAt

    this.socket.emit('product_detail', {productId: data.product_id})
    this.socket.on('product_detail', ({ res }) => {
      this.product = res
      // Logger.log(this.product)
    })
    withProduct.product = this.product
    return {
        statusCode: 200,
        data: withProduct
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

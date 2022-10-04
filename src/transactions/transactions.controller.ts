import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('api/transaction')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {}

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

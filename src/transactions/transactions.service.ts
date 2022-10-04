import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
    constructor(
      @InjectModel(Transaction.name) private readonly model: Model<TransactionDocument>
    ) {}

      async findAll(): Promise<Transaction[]> {
        return await this.model.find().exec();
      }
    
      async findOne(id: string): Promise<Transaction> {
        return await this.model.findById(id).exec();
      }
    
      async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await new this.model({
          ...createTransactionDto,
          createdAt: new Date(),
        }).save();
      }
    
      async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        return await this.model.findByIdAndUpdate(id, updateTransactionDto).exec();
      }
    
      async delete(id: string): Promise<Transaction> {
        return await this.model.findByIdAndDelete(id).exec();
      }
}

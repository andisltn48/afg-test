import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction,TransactionSchema  } from './schemas/transaction.schema';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testafg'),
    MongooseModule.forFeature([{
      name : Transaction.name,
      schema : TransactionSchema
    }])
  ],
  exports: [TransactionsService]
})
export class TransactionsModule {}

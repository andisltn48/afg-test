import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction,TransactionSchema  } from './schemas/transaction.schema';
import { TransactionListGateway } from './transaction-list.gateway';

@Module({
  providers: [TransactionsService, TransactionListGateway],
  controllers: [TransactionsController],
  imports: [
    MongooseModule.forFeature([{
      name : Transaction.name,
      schema : TransactionSchema
    }])
  ],
  exports: [TransactionsService]
})
export class TransactionsModule {}

import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
export declare class TransactionsService {
    private readonly model;
    constructor(model: Model<TransactionDocument>);
    findAll(): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    delete(id: string): Promise<Transaction>;
}

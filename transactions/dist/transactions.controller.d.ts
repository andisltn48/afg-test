import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly service;
    constructor(service: TransactionsService);
    index(): Promise<{
        statusCode: number;
        data: import("./schemas/transaction.schema").Transaction[];
    }>;
    find(id: string): Promise<{
        statusCode: number;
        data: import("./schemas/transaction.schema").Transaction;
    }>;
    create(createTransactionDto: CreateTransactionDto): Promise<{
        statusCode: number;
        data: import("./schemas/transaction.schema").Transaction;
    }>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        statusCode: number;
        data: import("./schemas/transaction.schema").Transaction;
    }>;
    delete(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}

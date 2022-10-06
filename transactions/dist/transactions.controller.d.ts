import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly service;
    constructor(service: TransactionsService);
    private socket;
    private product;
    index(): Promise<{
        statusCode: number;
        data: any[];
    }>;
    find(id: string): Promise<{
        statusCode: number;
        data: any;
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

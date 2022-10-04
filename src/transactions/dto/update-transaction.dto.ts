import { TransactionDto } from "./transaction.dto";

export class UpdateTransactionDto extends TransactionDto {
    updatedAt: Date;
}
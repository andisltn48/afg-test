import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  product_id?: string;

  @Prop({ required: true })
  total_price?: number;

  @Prop({ required: true })
  qty?: number;

  @Prop({ required: true })
  payment_method?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
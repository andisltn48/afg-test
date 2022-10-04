import { Bind } from "@nestjs/common";
import { WebSocketGateway,SubscribeMessage,MessageBody,WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { TransactionsService } from "./transactions.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TransactionListGateway {
    constructor(private readonly service: TransactionsService) {}

    @WebSocketServer()
    server : Server;
    
    @SubscribeMessage('product_list')
    async handleMessage() {
        var productList = await this.service.findAll()
        
        const response = {
            data : {
                productList : productList,
            }
        }
        this.server.emit('product_list',response);
    }
}
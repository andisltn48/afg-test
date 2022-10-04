import { Bind } from "@nestjs/common";
import { WebSocketGateway,SubscribeMessage,MessageBody,WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { ProductsService } from "./products.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ProductListGateway {
    constructor(private readonly service: ProductsService) {}

    @WebSocketServer()
    server : Server;
    
    @SubscribeMessage('product_list')
    async handleMessage() {
        var productList = await this.service.findAll()
        var maxPrice = await this.service.maxPrice()
        var minPrice = await this.service.minPrice()
        
        const response = {
            data : {
                productList : productList,
                maxPrice : maxPrice,
                minPrice : minPrice
            }
        }
        this.server.emit('product_list',response);
    }
}
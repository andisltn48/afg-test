import { Bind, Logger } from "@nestjs/common";
import { WebSocketGateway,SubscribeMessage,MessageBody,WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { ProductsService } from "./products.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ProductDetailGateway {
    constructor(private readonly service: ProductsService) {}

    @WebSocketServer()
    server : Server;

    @SubscribeMessage('product_detail')
    async handleMessage(@MessageBody() data) {
        var productDetail = await this.service.findOne(data.productId)
        Logger.log(productDetail)
        const response = {
            res : productDetail
        }
        this.server.emit('product_detail',response);
    }
}
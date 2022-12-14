"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const transactions_service_1 = require("./transactions.service");
const socket_io_client_1 = require("socket.io-client");
let TransactionsController = class TransactionsController {
    constructor(service) {
        this.service = service;
        this.product = {};
    }
    async index() {
        this.socket = (0, socket_io_client_1.io)("http://127.0.0.1:8000");
        var data = await this.service.findAll();
        var response = [];
        data.forEach(value => {
            var withProduct = {};
            var newValue = value;
            withProduct._id = newValue._id;
            withProduct.qty = newValue.qty;
            withProduct.total_price = newValue.total_price;
            withProduct.payment_method = newValue.payment_method;
            withProduct.createdAt = newValue.createdAt;
            withProduct.deletedAt = newValue.deletedAt;
            this.socket.emit('product_detail', { productId: newValue.product_id });
            this.socket.on('product_detail', ({ res }) => {
                this.product = res;
            });
            withProduct.product = this.product;
            response.push(withProduct);
        });
        return {
            statusCode: 200,
            data: response
        };
    }
    async find(id) {
        this.socket = (0, socket_io_client_1.io)("http://127.0.0.1:8000");
        var data = await this.service.findOne(id);
        var withProduct = {};
        var newValue = data;
        withProduct._id = newValue._id;
        withProduct.qty = newValue.qty;
        withProduct.total_price = newValue.total_price;
        withProduct.payment_method = newValue.payment_method;
        withProduct.createdAt = newValue.createdAt;
        withProduct.deletedAt = newValue.deletedAt;
        this.socket.emit('product_detail', { productId: data.product_id });
        this.socket.on('product_detail', ({ res }) => {
            this.product = res;
        });
        withProduct.product = this.product;
        return {
            statusCode: 200,
            data: withProduct
        };
    }
    async create(createTransactionDto) {
        var data = await this.service.create(createTransactionDto);
        return {
            statusCode: 200,
            data: data
        };
    }
    async update(id, updateTransactionDto) {
        var data = await this.service.update(id, updateTransactionDto);
        return {
            statusCode: 201,
            data: data
        };
    }
    async delete(id) {
        var data = await this.service.delete(id);
        return {
            statusCode: 201,
            message: 'delete product successfuly'
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "delete", null);
TransactionsController = __decorate([
    (0, common_1.Controller)('api/transaction'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map
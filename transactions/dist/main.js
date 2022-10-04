"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const transactions_module_1 = require("./transactions.module");
async function bootstrap() {
    const http = await core_1.NestFactory.create(transactions_module_1.TransactionsModule);
    http.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await http.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map
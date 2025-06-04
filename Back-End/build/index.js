"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex_1 = require("./server/database/Knex");
const Server_1 = require("./server/Server");
const startServer = () => {
    Server_1.server.listen(process.env.PORT || 3333, () => console.log('app rodadno'));
};
if (process.env.IS_LOCALHOST !== 'true') {
    Knex_1.Knex.migrate.latest().then(() => { Knex_1.Knex.seed.run().then(() => startServer()).catch(console.log); }).catch(console.log);
}
else {
    startServer();
}

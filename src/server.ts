import "reflect-metadata";
import {createConnection} from "typeorm";
import app from './app';

import "./routes"
import { config } from "./config";

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "quiz",
    entities: [
        __dirname + "/entity/*"
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    app.listen(config.PORT, () => console.log('Example app listening on port 3000!'));
}).catch(error => console.log(error));
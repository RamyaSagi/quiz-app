import express from "express";
import bodyParser from 'body-parser';
import * as auth from "./auth.js";

const app = express();
    
app.use(bodyParser.json());
console.log(auth)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

export default app
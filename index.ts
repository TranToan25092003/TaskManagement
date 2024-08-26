import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import routerV1 from "./API/V1/router/index.router";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config(); // dotenv

// create server
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
//end create server

// connect to db
database.connectToDatabase();
//end connect to db

app.use(cors()); // cors

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//end body parser

// cookie-parser
app.use(cookieParser());
//end cookie-parser

// v1
routerV1(app);
//end v1

app.listen(port, () => {
  console.log("server is running");
});

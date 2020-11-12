import express from "express";
import { resolve } from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import Route from "./Routes";
import { createServer } from "http";
import {Socket} from "socket.io";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.Middlewere();
    this.Routes();
    config({ path: resolve(__dirname, "../.env") });
  }

  private Middlewere() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.Sockets();
  }

  private Sockets(){
    const server = createServer(this.express);
    let io:Socket = require("socket.io")(server);
    this.express.use((req,res,next) => {
      req.body.socket = io;
      next();
    })
    io.on("connection",(socket:{id:string}) => {
      console.log(`Scoket conectado ${socket.id}`);
    });

  }

  private Routes() {
    this.express.use(Route);
  }
 
}

export default new App().express;
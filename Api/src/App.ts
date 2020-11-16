import express from "express";
import { resolve } from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import Route from "./Routes";
import socket, { Socket } from "socket.io";
import { createServer,Server } from "http";

class App {
  public express: express.Application;
  public server:Server;
  public constructor() {
    this.express = express();
    this.server = createServer(this.express);
    const io = socket(this.server);
   
     
     io.on("connection",(socket:Socket) => {
        // socket.broadcast.emit("mensagem","usuario conectou")
     });
     

    this.Middlewere();
    this.express.use((req,res,next) => {
      
      req.body.socket = io;
      next();
    })
    this.Routes();
    config({ path: resolve(__dirname, "../.env") });
  }

  private Middlewere() {
    this.express.use(cors());
    this.express.use(bodyParser.json());

  }


  private Routes() {
    this.express.use(Route);
  }
 
}

export default new App().server;
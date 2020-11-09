import express from "express";
import { resolve } from "path";
import cors from "cors";
import { config } from "dotenv";
import Route from "@Routes/index";

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
  }

  private Routes() {
    this.express.use(Route);
  }



  
   

 
}

export default new App().express;
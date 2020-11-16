import { Router } from "express";
import AuthController from "../Controller/AuthController";
import GruposController from "../Controller/GruposController";

const route = Router();

route.post("/login", AuthController.index);
route.post("/register",AuthController.store);
route.get("/grupo",AuthController.authenticateJWT,GruposController.findAll);
route.post("/grupo",AuthController.authenticateJWT,GruposController.store);
route.get("/grupo/:id/mensagens",AuthController.authenticateJWT,GruposController.findAllMensagem);
route.post("/grupo/:id/mensagens",AuthController.authenticateJWT,GruposController.sendMensagem);
route.get("/grupo/:id/join",AuthController.authenticateJWT,GruposController.join);
route.put("/grupo",AuthController.authenticateJWT,GruposController.update);
route.delete("/grupo/:id",AuthController.authenticateJWT,GruposController.delete);

export default route;
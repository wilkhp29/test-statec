import { Router } from "express";

const route = Router();

route.get("/",async (req, res) =>
{ 
  return res.status(200).send("Hello word");
}
);

export default route;
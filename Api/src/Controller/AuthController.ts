import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

interface req  {
  email: string;
  password: string;
};

const db = new PrismaClient();
class AuthController {
  public async index(req: Request, res: Response) {

    const { email, password }: req = req.body;
    
    const user = await db.usuario.findFirst({where:{email},include:{Grupos:true}})
    //verificar se o usuário existe
    if (!user) return res.status(401).send({ error: "user not found" });

    //verificar se a senha conferi
    if (!(await compare(password, user.password)))
      return res.status(401).send({ error: "password invalid" });

    //gerando o token
    const token = sign({ id: user?.id }, process.env.SECRET!, {
      expiresIn: 32400,
    });

    user.password = "";

    await db.$disconnect();

    return res.status(200).send({ token, user });
  }


  public async store (req: Request,res:Response){
    const {email,password}:req = req.body

    

    const cryptPass = await hash(password, 10);
    
    const user = await db.usuario.upsert({where:{email},create:{email, password:cryptPass},update:{email,password:cryptPass},include:{Grupos:true}});

    const token = sign({ id: user?.id }, process.env.SECRET!, {
      expiresIn: 32400,
    });

    await db.$disconnect();

    return res.status(200).send({user,token});

  }

  public async authenticateJWT(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    const token = req.header("Authorization");

    if (!token)
      return res.status(401).send({ auth: false, message: "Token empty." });

    verify(token.replace("Bearer ", ""), process.env.SECRET!, async function  (
      err,
      decoded: any
    ) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token inválido." });

      const user = await db.usuario.findFirst({where:{id:decoded.id}});
      if(!user)  return res
        .status(500)
        .send({ auth: false, message: "Token inválido." });
      
      req.body.user = user;
      next();
    });
  }
}

export default new AuthController();

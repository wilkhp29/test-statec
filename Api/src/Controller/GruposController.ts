
import { PrismaClient, Usuario } from "@prisma/client";
import { Request, Response } from "express";
import {Client} from "onesignal-node"
import {  Socket,Server } from "socket.io";

interface reqGrupo {
  name:string;
  id:number;
}


const db = new PrismaClient();
const onesignal = new Client('78935163-9721-49ce-90d2-2d567ff2cedc', 'YzE2N2Q5MzMtMDAyMy00YmQwLWEzMzItMGQ1MzA3M2Y3NzA5');
class GruposController {

  public async findAll(req: Request, res: Response){
    const grupos = await db.grupos.findMany();
    return res.status(200).send(grupos);
  }

  public async findAllMensagem(req: Request, res: Response){
    const {id} = req.params;

    const mensagens = await db.mensagens.findMany({where:{Grupos:{id:Number(id)}}});
    return res.status(200).send(mensagens);
  }

  public async sendMensagem(req: Request, res: Response){
    const {id} = req.params;
    const {msg,user,socket} = req.body
    const mensagem = await db.mensagens.create({data:{mensagens:msg,Usuario:{connect:{id:user.id}},Grupos:{connect:{id:Number(id)}}},include:{Grupos:true,Usuario:true}})

    const response = await onesignal.createNotification({contents:{'en': ` ${user.email} envio uma mensagem no grupo ${mensagem.Grupos?.name}`},filters:[{field: 'tag', key: 'grupo', relation: '=', value: mensagem.Grupos?.name}]})
    const so:Server = socket;
    so.emit("mensagem",mensagem);

    return res.status(201).send()
  }

  public async join(req: Request, res: Response){
    const {user,socket}:{user:Usuario,socket:Socket} = req.body;
    const {id} = req.params;

    const grupo = await db.grupos.update({where:{id:Number(id)},data:{Usuarios:{connect:{id:user.id}}},include:{Usuarios:true}})
   
      const {body} = await onesignal.createNotification({contents:{'en': `O usuario ${user.email} se juntou ao grupo ${grupo.name}`},filters:[{field: 'tag', key: 'grupo', relation: '=', value: grupo.name}]})
      
    socket.emit("join",{grupo,user});
    
    return res.status(200).send(grupo);
  }

  public async store(req: Request, res: Response){
    const {name}:reqGrupo = req.body;

    const grupo = await db.grupos.upsert({where:{name},create:{name},update:{name}});
    
    return res.status(200).send(grupo);
  }

  public async update(req: Request, res: Response){
    const {name,id}:reqGrupo = req.body;


    const grupo = await db.grupos.update({where:{id},data:{name}});
    return res.status(200).send({grupo});
  }

  public async delete(req: Request, res: Response){
    const {id} = req.params;
    try{
     const grupo = await db.grupos.delete({where:{id:Number(id)}});

      return res.status(200).send(grupo);
    }catch(erro){
      return res.status(200);
    }
  }
}


export default new GruposController()
import api from "../utills";

describe("data grupos",() => {
  it("create a group",async () => {
    //get Token
    const {body:{token}} = await api.post("/login")
    .send({email:"wilkhp29@gmail.com", password:"09242204"})
    
    const {body} = await api.post("/grupo")
    .set("Authorization",`Bearer ${token}`)
    .send({name:"devs"})
    .expect(200); 
  });
  
  it("get all grupos",async () => {
    const {body:{token}} = await api.post("/login")
    .send({email:"wilkhp29@gmail.com", password:"09242204"})

    const {body} = await api.get("/grupo")
    .set("Authorization",`Bearer ${token}`)
    .expect(200);  

    expect(body).toBe(1);
  });

  it("join",async () => {
    const {body:{token}} = await api.post("/login")
    .send({email:"wilkhp29@gmail.com", password:"09242204"})

    const {body} = await api.get("/grupo/1/join")
    .set("Authorization",`Bearer ${token}`)
    .expect(200); 
  });

  it("update",async () => {
    const {body:{token}} = await api.post("/login")
    .send({email:"wilkhp29@gmail.com", password:"09242204"});
    const {body} = await api.put("/grupo")
    .set("Authorization",`Bearer ${token}`)
    .send({name:"devs"})
    .expect(200); 
  });

  it("delete",async () => {
    const {body:{token}} = await api.post("/login")
    .send({email:"wilkhp29@gmail.com", password:"09242204"});

    const {body} = await api.delete("/grupo/1")
    .set("Authorization",`Bearer ${token}`)
    .expect(200); 
  });
})
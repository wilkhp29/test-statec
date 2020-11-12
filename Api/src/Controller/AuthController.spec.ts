import api from "../utills";

describe("test of authenticated",() => {
 
  it("register user",async () => {
    const {body} = await api.post("/register")
     .send({email:"wilkhp29@gmail.com",password:"09242204"})
     .expect(200);
 
     expect(body.user.email).toBe("wilkhp29@gmail.com");
   });

   it("login user",async () => {
    const {body} = await api.post("/login")
     .send({email:"wilkhp29@gmail.com",password:"09242204"})
     .expect(200);
 
     expect(body.user.email).toBe("wilkhp29@gmail.com");
   });
})
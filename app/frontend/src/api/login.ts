import { api } from "./axios";
type loginCredentials = {
  email: string;
  password: string;
};
type UserInfo = {
  _id: string;
  name: string;
  email: string;
}
//@path POST /api/users/
export async function loginUser(data: loginCredentials):Promise<UserInfo> {
   const res = await api.post("/users/auth", data, {withCredentials: true})
    return res.data     
    
}
//@path GET /api/users/profile
export async function getUser():Promise<UserInfo>{
    const res = await api.get("/users/profile", {
      
      withCredentials: true
    })
    return res.data
}
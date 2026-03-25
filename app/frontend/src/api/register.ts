import { api } from "./axios";


type registerData = {
  name: string;
  email: string;
  password: string;
}
// @path POST /api/users/
export async function registerUser(data: registerData){
    const res = await api.post("/users", data)
    return res.data
}
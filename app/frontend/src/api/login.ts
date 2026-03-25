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
   const res = await api.post("/users/auth", data)
   const token = res.data?.token

   if (typeof token === 'string' && token) {
    sessionStorage.setItem('accessToken', token)
   }

    return res.data?.user
}
//@path GET /api/users/profile
export async function getUser():Promise<UserInfo>{
    const res = await api.get("/users/profile")
    return res.data
}

//@path POST /api/users/logout
export async function logoutUser() {
  const res = await api.post('/users/logout');
  sessionStorage.removeItem('accessToken');
  return res.data;
}
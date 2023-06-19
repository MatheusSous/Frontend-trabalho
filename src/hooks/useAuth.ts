import api from "@/utils/api";
import { useFlashMessage } from "./useFlashMessage";
import { useEffect, useState } from 'react';

export type UserProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
};

export function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated]=useState(false)
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if(localToken){
      setAuthenticated(true)
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(localToken)}`
    }
  },[])
  async function register(user: object) {
    //initial msg:
    let msgText = "Usuário Cadastrado com sucesso!";
    let msgType = "success";
    //with axios:
    try {
      const data = await api
        .post("/users/register", user)
        .then((res) => res.data);
      await authUser(data);
    } catch (error: any) {
      console.log(error.response.data.message);
  
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
    //try with fetch api
    // const baseUrl = process.env.GET_A_PET_API;
    // try {
    //   const data = await fetch(`${baseUrl}/users/register`, {
    //     method: "POST",
    //     body: JSON.stringify(user),
    //   }).then(res => res.json())
    //   console.log(data)
    // } catch (err) {
    //   console.log(err)
    // }
    async function authUser(
      data: any,
    ) {
      setAuthenticated(true)
      // const router = useRouter()
      localStorage.setItem("token", JSON.stringify(data.token));
      // redirect('/')
      // router.replace('/')
      window.location.replace('/')
      
    }
  }
  

  return { register, authenticated };
}

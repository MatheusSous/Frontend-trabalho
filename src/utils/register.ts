import api from "./api";

import { setFlashMessage } from "./setFlashMessage";
import { authUser } from "./authUser";

export async function register(user: object) {
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
}

import api from './api';
import { authUser } from './authUser';
import { setFlashMessage } from './setFlashMessage';

export async function login(user:object) {
  let msgText = "Login realizado com sucesso"
  let msgType = "success"

  try {
    const data = await api
      .post("/users/login", user) 
      .then((res) => res.data);
    await authUser(data);
  } catch (error: any) {
    msgText = error.response.data.message;
    msgType = "error";
  }
  setFlashMessage(msgText, msgType);
}
"use client";

import { Input } from "./Input";
import { Submit } from "./Submit";
import { useEffect, useState } from "react";
import api from '@/utils/api';
import { register } from '@/utils/register';

//import my context
// import { UserContext } from "@/context/UserContext";


export function Form() {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(()=>{
    const localToken = localStorage.getItem('token')
    if(localToken){
      setAuthenticated(true)
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(localToken)}`
    }
  },[authenticated])
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    //use my context

    //Send user for db
    register(user);
  }
  return (
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          text="Nome do Usuário"
          placeholder="Digite o nome do usuário"
          handleOnChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          text="E-mail"
          placeholder="Digite o seu E-mail"
          handleOnChange={handleChange}
        />
        <Input
          name="phone"
          type="text"
          text="Telefone"
          placeholder="Digite o Telefone"
          handleOnChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          text="Senha"
          placeholder="Digite o sua Senha"
          handleOnChange={handleChange}
        />
        <Input
          name="confirmpassword"
          type="password"
          text="Confirmar Senha"
          placeholder="Digite confirme sua senha"
          handleOnChange={handleChange}
        />
        {authenticated? (
          <Submit disabled value='Cadastrar' />
        ): (
          <Submit disabled={false} value='Cadastrar' />
        )}
      </form>
  );
}

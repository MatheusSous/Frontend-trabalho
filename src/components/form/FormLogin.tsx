"use client";


import { login } from '@/utils/login';
import { Input } from "./Input";
import { Submit } from "./Submit";
import { useEffect, useState } from "react";
import api from '@/utils/api';
// import api from '@/utils/api';

export function FormLogin() {
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
    login(user);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Digite o seu E-mail"
        text="E-mail"
        handleOnChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Digite sua Senha"
        text="Senha"
        handleOnChange={handleChange}
      />
      <Submit value='Entrar'/>
    </form>
  );
}

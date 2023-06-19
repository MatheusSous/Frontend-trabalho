"use client";


import api from '@/utils/api';
import { setFlashMessage } from '@/utils/setFlashMessage';
import Link from "next/link";
import { useEffect, useState } from "react";

export function MenuLinks() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(()=>{
    const localToken = localStorage.getItem('token')
    if(localToken){
      setAuthenticated(true)
    }
  },[])
  const handleLogout = () => {
    const msgText = "Logout realizado com sucesso!"
    const msgType = "success"
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    setFlashMessage(msgText, msgType);
    window.location.replace('/')
  }
  return (
    <>
      {authenticated ? (
        <ul className="flex items-center bold">
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Adotar
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/user/profile"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Meu Perfil
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/pets/mypets"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Meus Pets
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/pets/myadoptions"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Adoções
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <button className="transition-all duration-[0.5s] hover:text-[#6c9df1]" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center bold">
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Adotar
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/login"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Entrar
            </Link>
          </li>
          <li className="py-2 px-3 text-xl rounded">
            <Link
              href="/register"
              className="transition-all duration-[0.5s] hover:text-[#6c9df1]"
            >
              Registrar
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

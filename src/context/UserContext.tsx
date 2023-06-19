"use client";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { register } from "../utils/register";
import api from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";

interface UserProviderProps {
  children: React.ReactNode;
}

type userContextProps = {
  authenticated: string;
  setAuthenticated: Dispatch<SetStateAction<string>>;
  register: (user: any) => any;
  
};
const userContextDefaultValues: userContextProps = {
  authenticated: "",
  register: register,
  setAuthenticated:():string => ''
};

const UserContext = createContext<userContextProps>(userContextDefaultValues);



export function UserProvider({ children }: UserProviderProps) {
  const [authenticated, setAuthenticated] = useState('')

  const value = { register, authenticated: authenticated, setAuthenticated: setAuthenticated };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}


export function useAuthContext() {  
  return useContext(UserContext)
}
"use client";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Submit } from "./Submit";
import api from "@/utils/api";
import { setFlashMessage } from "@/utils/setFlashMessage";
import Image from "next/image";

interface UserProps {
  image?: any;
  email?: string;
  name?: string;
  _id?: any;
  phone?: string;
  password?: string;
  confirmpassword?: string;
}

export function FormProfile() {
  const [user, setUser] = useState<UserProps>({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/users/check-user", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((resp) => {
        setUser(resp.data);
      });
  }, [token]);
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <h1 className="my-title">Profile</h1>
        {(user.image || preview) && (
          <div className="flex justify-center items-center">
            <img className='rounded-full w-[200px] h-[200px]'
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `http://localhost:5000/images/users/${user.image}`
              }
              alt={`image-${user.name}`}
            />
            {/* <Image 
              width={300}
              height={300}
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `http://localhost:5000/images/users/${user.image}`
              }
              alt={`image-${user.name}`}
              unoptimized={false}
            /> */}
          </div>
        )}
      </div>
      <Input
        name="image"
        text="Image"
        type="file"
        handleOnChange={onFileChange}
      />
      <Input
        name="email"
        text="E-mail"
        type="email"
        placeholder="Digite seu E-mail"
        handleOnChange={handleChange}
        value={user.email || ""}
      />
      <Input
        name="name"
        text="Nome"
        type="text"
        placeholder="Digite seu Nome"
        handleOnChange={handleChange}
        value={user.name || ""}
      />
      <Input
        name="phone"
        text="Telefone"
        type="text"
        placeholder="Digite seu Telefone"
        handleOnChange={handleChange}
        value={user.phone || ""}
      />
      <Input
        name="password"
        text="Senha"
        type="password"
        placeholder="Digite seu Senha"
        handleOnChange={handleChange}
      />
      <Input
        name="confirmpassword"
        text="Confirme sua senha"
        type="password"
        placeholder="Confirme sua senha"
        handleOnChange={handleChange}
      />
      <Submit value="Editar" />
    </form>
  );
}

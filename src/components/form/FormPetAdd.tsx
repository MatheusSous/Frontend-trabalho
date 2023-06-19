"use client";

import { Input } from "./Input";
import { Submit } from "./Submit";
import { Select } from './Select';
import { useEffect, useState } from "react";
import api from "@/utils/api";

import { PetProps } from "@/app/pets/create/page";
import { registerPet } from "@/utils/registerPet";
import { updatedPet } from "@/utils/updatedPet";

//import my context
// import { UserContext } from "@/context/UserContext";

interface FormPetAddProps {
  petData?: PetProps;
  btnText: string;
  formType: string;
}
export function FormPetAdd({ petData, btnText, formType }: FormPetAddProps) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [token] = useState(localStorage.getItem("token") || "");
  const sexs = ["masculino", "feminino"];
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(localToken)}`;
    }
  }, [authenticated]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }
  function handleSex(e: React.ChangeEvent<HTMLSelectElement>) {
    setPet({ ...pet, [e.target.name]: e.target.options[e.target.selectedIndex].text });
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;
    setPet({ ...pet, images: [...files] });
    setPreview([...files]);
  }

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    //use my context
    //Send user for db
    if (formType === "register") {
      registerPet(pet, token);
    } else if (formType === "edit") {
      updatedPet(pet, token);
    }
  }
  return (
    <form onSubmit={submit}>
      <div className="flex justify-center m-4">
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                className="w-[80px] h-[80px] ml-2 rounded"
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}-${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image: any, index: any) => (
              <img
                className="w-[80px] h-[80px] ml-2 rounded"
                src={`http://localhost:5000/images/pets/${image}`}
                alt={pet.name || "pet"}
                key={`${pet.name}-${index}`}
              />
            ))}
      </div>
      <Input
        name="images"
        text="Imagens"
        type="file"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        name="name"
        type="text"
        text="Nome do Pet"
        placeholder="Digite o nome do Pet"
        value={pet.name || ""}
        handleOnChange={handleChange}
      />
      <Input
        name="age"
        type="number"
        text="Idade"
        placeholder="Digite a idade do seu pet"
        value={pet.age || ""}
        handleOnChange={handleChange}
      />
      <Input
        name="weight"
        type="number"
        text="Peso"
        placeholder="Digite o peso do seu pet"
        value={pet.weight || ""}
        handleOnChange={handleChange}
      />
      <Select
        name="sex"
        text="Sexo"
        options={sexs}
        value={pet.sex || ""}
        handleOnChange={handleSex}
      />
      <Input
        name="color"
        type="text"
        text="Cor"
        placeholder="Digite a cor do seu pet"
        value={pet.color || ""}
        handleOnChange={handleChange}
      />
      {authenticated ? (
        <Submit disabled={false} value={btnText} />
      ) : (
        <Submit disabled value={btnText} />
      )}
    </form>
  );
}

"use client";

import { PetProps } from "@/app/pets/create/page";
import api from "@/utils/api";
import { setFlashMessage } from "@/utils/setFlashMessage";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PetsListProps {
  pets?: Array<PetProps>;
}

export function PetsList({ pets }: PetsListProps) {
  const [myPets, setMyPets] = useState(pets || []);
  const [token] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => setMyPets(res.data.pets))
      .catch((err) => console.log(err));
  }, [token]);

  async function removePet(id: any) {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        const updatedPets = myPets.filter((pet) => pet._id !== id);
        setMyPets(updatedPets);
        return res.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  
  async function concludeAdoption(id: any) {
    let msgType = "success";
    const formData = new FormData()
    const data = await api
      .patch(`/pets/conclude/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <ul className="flex flex-col">
      {myPets.length > 0 &&
        myPets.map((pet, index) => (
          <li
            className="flex items-center border-b-2 border-gray-300 px-4"
            key={`${pet.name}-${index}`}
          >
            <img
              className="w-[60px] h-[60px] mb-4 mt-4 rounded-full"
              src={`http://localhost:5000/images/pets/${pet.images[0]}`}
              alt={pet.name || "pet"}
            />
            <span className="bold ml-6 min-w-[100px]">{pet.name}</span>
            <div className="ml-auto">
              {pet.available ? (
                <div className="flex items-center">
                  {pet.adopter && (
                    <button onClick={() => concludeAdoption(pet._id)} className="conclude">Concluir Adoção</button>
                  )}
                  <Link className="button" href={`/pets/edit/${pet._id}`}>
                    Editar
                  </Link>
                  <button
                    className="button bg-red-700 border-red-700 hover:text-red-700"
                    onClick={() => {
                      removePet(pet._id);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              ) : (
                <p className="text-[#25b456]">Pet já adotado!</p>
              )}
            </div>
          </li>
        ))}
      {myPets.length === 0 && <p>Não há pets Cadastrados</p>}
    </ul>
  );
}

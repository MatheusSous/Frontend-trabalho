"use client";

import { PetProps } from "@/app/pets/create/page";
import api from "@/utils/api";
import { useEffect, useState } from "react";

interface AdoptionsListProps {
  pets?: Array<PetProps>;
}

export function AdoptionsList({ pets }: AdoptionsListProps) {
  const [myPets, setMyPets] = useState(pets || []);
  const [token] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => setMyPets(res.data.pets))
      .catch((err) => console.log(err));
  }, [token]);

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
            <div className='ml-8'>
              <p>
                <span className='bold'>Ligue Para:</span> {pet.user.phone}
              </p>
              <p>
                <span className='bold'>Fale com:</span> {pet.user.name}
              </p>
            </div>
            <div className="ml-auto">
              {pet.available ? (
                <p>Adoção em processo</p>
              ) : (
                <p className="text-[#25b456]">Parabéns por adotar o pet!</p>
              )}
            </div>
          </li>
        ))}
      {myPets.length === 0 && <p>Ainda não há adoções de pets</p>}
    </ul>
  );
}
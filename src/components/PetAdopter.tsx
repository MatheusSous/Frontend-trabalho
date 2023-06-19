"use client";

import { PetProps } from "@/app/pets/create/page";
import api from "@/utils/api";
import { setFlashMessage } from "@/utils/setFlashMessage";
import Link from "next/link";
import { useState } from "react";

interface PetAdopterProps {
  pet: PetProps;
}

export function PetAdopter({ pet }: PetAdopterProps) {
  const [myPet] = useState(pet);
  const [token] = useState(localStorage.getItem("token") || "");

  async function schedule() {
    let msgType = "success";
    const formData = new FormData()
    const data = await api
      .patch(`pets/schedule/${myPet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((resp) => resp.data)
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <div>
      {token ? (
        <button
          onClick={schedule}
          className="button bg-[#25b456] border-none text-white text-lg hover:bg-[#1c8456] hover:text-white"
        >
          Solicitar Sua visita
        </button>
      ) : (
        <p>
          Você precisa esta{" "}
          <Link className="bold" href={"/register"}>
            registrado
          </Link>{" "}
          para agendar uma visita
        </p>
      )}
    </div>
  );
}

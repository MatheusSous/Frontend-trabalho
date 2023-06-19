import { PetProps } from "@/app/pets/create/page";
import Link from "next/link";
import { AiOutlineWoman, AiOutlineMan } from "react-icons/ai";

interface PetCardProps {
  pet: PetProps;
}

export function PetCard({ pet }: PetCardProps) {
  const age = parseInt(pet.age || "");
  const weight = parseInt(pet.weight || "");
  return (
    <div className="w-[22%] m-[1.5%] card">
      <img
        className="w-full h-40 rounded-t-lg mb-3"
        src={`http://localhost:5000/images/pets/${pet.images[0]}`}
        alt={pet.name}
      />
      <div className="flex justify-center items-center mb-3">
        <h3 className="bold mr-2">{pet.name}</h3>
        {pet.sex === "masculino" && <AiOutlineMan size={22} color='#44878f'/>}
        {pet.sex === "feminino" && <AiOutlineWoman size={22} color='#ff8591'/>}
      </div>
      <div className="flex justify-center items-center mb-4">
        <p>
          {age <= 3 && <span className="mr-1">Filhote</span>}
          {age > 3 && age < 7 && <span className="mr-1">Adulto</span>}
          {age >= 7 && <span className="mr-1">Idoso</span>}
        </p>
        |
        <p className="ml-1">
          Porte
          {weight < 3 && <span className="ml-1">Pequeno</span>}
          {weight >= 3 && weight < 6 && <span className="ml-1">Médio</span>}
          {weight > 7 && <span className="ml-1">Grande</span>}
        </p>
      </div>
      <div className="flex justify-center items-center pb-4 rounded-lg">
        {pet.available ? (
          <Link
            href={`pet/${pet._id}`}
            className="button text-lg ml-0 flex justify-center items-center"
          >
            Saiba Mais
          </Link>
        ) : (
          <p className="flex justify-center items-center text-[#25b456]">
            Adotado!
          </p>
        )}
      </div>
    </div>
  );
}

import api from "@/utils/api";
import { PetProps } from "./pets/create/page";
import { PetCard } from "@/components/PetCard";

export const revalidate = 60;

export default async function Home() {
  const pets = await api
    .get("/pets")
    .then((res) => {
      return res.data.pets;
    })
    .catch((err) => console.log(err));
  return (
    <section>
      <div className="mb-8">
        <h1 className="my-title bold mb-1">Adote um pet</h1>
        <p>Conheça o detalhe de cada um e conheça o tutor dele!</p>
      </div>
      <div className='flex justify-start flex-wrap'>
        {pets.map((pet: PetProps) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </section>
  );
}

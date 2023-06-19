import { PetAdopter } from '@/components/PetAdopter';
import api from "@/utils/api";

export default async function PetDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const pet = await api
    .get(`/pets/${id}`)
    .then((resp) => resp.data.pet)
    .catch((err) => console.log(err));
  return (
    <section className='text-center'>
      <div className='mb-8'>
        <h1 className="my-title">Conhecendo o Pet: {pet.name}</h1>
        <p>Se tiver interesse marque uma visita para conhecê-lo</p>
      </div>
      <div className='w-[1000px] flex flex-wrap justify-center items-center my-0 mx-auto mb-4'>
        {pet.images.map((image: any, index: any) => (
          <img
            className='w-[200px] h-[150px] m-4 rounded-lg'
            key={index}
            src={`http://localhost:5000/images/pets/${image}`}
            alt={pet.name || "pet"}
          />
        ))}
      </div>
      <p className='mb-4'>
        <span className='bold'>Peso: </span> {pet.weight}Kg
      </p>
      <p className='mb-4'>
        <span className='bold'>Idade: </span> {pet.age} Anos
      </p>
      <p className='mb-4'>
        <span className='bold'>Sexo: </span> {pet.sex}
      </p>
      <PetAdopter pet={pet}/>
    </section>
  );
}

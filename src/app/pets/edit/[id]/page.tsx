import { FormPetAdd } from '@/components/form/FormPetAdd';
import api from "@/utils/api";

export default async function PetEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  const pet = await api
    .get(`/pets/${id}`)
    .then((resp) => resp.data.pet)
    .catch((err) => console.log(err));
  return (
    <section className='form'>
      <h1 className="my-title text-center">Edit Pet: {pet.name}</h1>
      <FormPetAdd formType='edit' btnText='Editar' petData={pet}/>
    </section>
  );
}

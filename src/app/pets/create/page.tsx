import { FormPetAdd } from "@/components/form/FormPetAdd";

export type PetProps = {
  name?: string;
  age?: string;
  weight?: string;
  color?: string;
  sex?: string;
  images?: any;
  available?: boolean;
  adopter?: any;
  _id?: any;
  user?: any;
};

export default async function PetCreate() {
  return (
    <section>
      <div className="text-center mb-5">
        <h1 className="my-title mb-1">Cadastrar Pet</h1>
        <p>Depois ele ficara disponível para adoção</p>
      </div>
      <div className="form">
        <FormPetAdd btnText="Cadastrar Pet" formType='register' />
      </div>
    </section>
  );
}

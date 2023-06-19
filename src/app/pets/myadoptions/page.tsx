import { AdoptionsList } from '@/components/AdoptionsList';

export default async function MyAdoptions() {

  return (
    <section>
        <h1 className='my-title'>Minhas Adoções</h1>
        <AdoptionsList />
    </section>
  );
}

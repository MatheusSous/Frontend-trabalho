import { PetsList } from '@/components/PetsList';
import Link from 'next/link';

export default async function MyPets() {

  return (
    <section>
        <h1 className='my-title mb-0'>My Pets</h1>
        <p>Cadastre seu Pet: <Link className='bold' href='/pets/create'>Click aqui</Link></p>
        <PetsList />
    </section>
  );
}

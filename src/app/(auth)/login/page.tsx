import { FormLogin } from '@/components/form/FormLogin';
import Link from 'next/link';

export default function Login() {
  return (
    <section className='form'>
      <h1 className='my-title'>Login</h1>
      <FormLogin />
      <p className="mt-4">
        Não possui conta?{" "}
        <Link href="/register" className="text-[#16479d] font-semibold">
          Click Aqui
        </Link>
      </p>
    </section>
  );
}

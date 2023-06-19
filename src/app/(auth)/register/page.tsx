import { Form } from "@/components/form/Form";
import { UserProvider } from "@/context/UserContext";

import Link from "next/link";


export default function Register() {
  return (
    <UserProvider>
        <section className="form">
          <h1 className="my-title">Register</h1>
          <Form />
          <p className="mt-4">
            Já possui conta?{" "}
            <Link href="/login" className="text-[#16479d] font-semibold">
              Click Aqui
            </Link>
          </p>
        </section>
    </UserProvider>
  );
}

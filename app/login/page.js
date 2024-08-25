import UsuariosForm from "@/components/UsuariosForm";

import Image from "next/image";
import Logo from "@/assets/img/logo_ovinopro.png";

export default function LoginPage() {
  return (
    <main className="w-full h-screen bg-white flex justify-center items-center">
      <div className="w-2/3 bg-white h-full flex flex-col justify-around items-center">
        <h1 className="text-primary border-2 border-primary p-4 rounded-lg text-6xl tracking-wider font-extralight  ">OVINOPRO</h1>
        <Image
          className=""
          src={Logo}
          width={400}
          height={400}
          alt="OVINO PRO"
        />
        <p className="text-primary">v0.1 beta</p>
      </div>
      <div className="w-1/3 bg-primary h-full flex justify-center items-center">
        <UsuariosForm />
      </div>
    </main>
  );
}

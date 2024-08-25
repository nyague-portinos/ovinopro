"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoNoBg from "@/assets/img/logo-nobg.png";
import axios from "axios";

export default function Nav() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [establecimiento, setEstablecimiento] = useState(null);
  useEffect(() => {
    // Actualiza la fecha y hora cada segundo
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El arreglo de dependencias vacío asegura que este efecto se ejecute solo una vez

  useEffect(() => {
    setUserData(JSON.parse(window.localStorage.getItem("data")));
  }, []);

  useEffect(() => {
    console.log("userData:", userData);
    if (userData?.id) {
      getEstablecimiento(userData.id).then((data) => {
        console.log("Data fetched:", data);
        setEstablecimiento(data);
      });
    }
  }, [userData]); // Agrega userData como dependencia para verificar cambios

  async function getEstablecimiento(id) {
    try {
      const res = await axios.get(`/api/establecimiento/${id}`);
      const result = res.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    window.localStorage.clear();
    router.push("/");
  }

  function handleLogoClick(){
    router.push('/')
  }
  return (
    <nav className="w-full h-20 bg-primary fixed top-0 flex items-center px-10  justify-between z-50">
      <div className="flex items-center gap-3 hover:cursor-pointer" onClick={handleLogoClick}>
        <Image
          src={LogoNoBg}
          alt="OVINOPRO"
          className="border w-16 h-16 rounded-full p-2"
        />
        <span className="font-light tracking-widest border-b">OVINOPRO</span>
      </div>
      {establecimiento?.length > 0 && (
        <span className="text-2xl border px-3 py-2 font-light tracking-wider ">
          {establecimiento[0]?.nombre}
        </span>
      )}

      <div className="flex items-center gap-5">
        <span className=" px-2 py-1 rounded-lg bg-secondary tracking-wider text-primary font-semibold">
          {date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}
        </span>
        <span className="text-white font-semibold tracking-wide text-xl">
          {userData?.nombre} {userData?.apellido}
        </span>
        <button onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

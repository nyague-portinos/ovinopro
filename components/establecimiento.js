"use client";
import { useEffect, useState } from "react";
import BasicBars from "./chart";
import BasicLineChart from "./chart2";
import BasicPie from "./chart3";
import BasicGauge from "./chart4";
import axios from "axios";

import Image from "next/image";

import Logo from "@/assets/img/imagen_oveja.png";
import { EstablecimientosForm } from "./EstablecimientosForm";

export default function Establecimiento() {
  const [establecimiento, setEstablecimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [userData, setUserData] = useState({});

  async function fetchEstablecimiento(id_usuario) {
    try {
      const response = await axios.get(`/api/establecimiento/${id_usuario}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    const { id } = JSON.parse(window.localStorage.getItem("data"));
    fetchEstablecimiento(id).then((data) => {
      setEstablecimiento(data);
      setLoading(false);
    });
  }, []);

  function handleCrearEstablecimiento() {
    setIsCreating(true);
  }

  if (loading) {
    return (
      <>
        <div
          role="status"
          className="flex items-center justify-center w-full h-full"
        >
          <svg
            aria-hidden="true"
            className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }
  return establecimiento.length > 0 ? (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
      <div className="border rounded-lg shadow-lg flex items-center justify-center ">
        <BasicBars />
      </div>
      <div className=" border rounded-lg shadow-lg flex items-center justify-center ">
        <BasicLineChart />
      </div>
      <div className="flex items-center justify-center border rounded-lg shadow-lg ">
        <BasicPie />
      </div>
      <div className=" border flex items-center justify-center rounded-lg shadow-lg max-w-full max-h-full ">
        <BasicGauge />
      </div>
    </div>
  ) : isCreating ? (
    <EstablecimientosForm />
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <Image src={Logo} width={200} height={200} alt="OVINO PRO" />
      <h3 className="text-primary text-5xl tracking-wide ">
        ¡Aún no tienes un establecimiento!
      </h3>
      <p className="text-primary font-light text-2xl">
        Registra tu establecimiento para comenzar a utilizar OVINOPRO
      </p>
      <button
        onClick={handleCrearEstablecimiento}
        className="border border-primary rounded-lg px-3 py-2 text-xl text-primary hover:bg-primary hover:text-white transition-all duration-200 tracking-wider"
      >
        Agregar establecimiento
      </button>
    </div>
  );
}

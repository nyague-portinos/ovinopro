"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function UsuariosForm() {
  const [formType, setFormType] = useState("login"); // 'login', 'signin', 'recover'
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [userCreateSucessfull, setUserCreateSucessfull] = useState(false);

  const router = useRouter();

  // para el registro
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const emailRef = useRef(null);
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // refresco los inputs cuando paso de un form a otro
  useEffect(() => {
    if (emailRef.current) emailRef.current.value = "";
    if (nombreRef.current) emailRef.current.value = "";
    if (apellidoRef.current) emailRef.current.value = "";
    if (userRef.current) userRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
  }, [formType]);

  useEffect(() => {
    if (isErrorLogin) {
      userRef.current.value = "";
      passwordRef.current.value = "";
    }
  }, [isErrorLogin]);

  // cambio de form
  function changeFormType(type) {
    setFormType(type);
  }

  //TODO completar funcion, ya captura bien los valores
  async function handleLogin(e) {
    setIsErrorLogin(false);
    try {
      e.preventDefault();
      setIsLoading(true);
      const result = await axios.post("/api/auth", {
        usuario: userRef.current.value,
        password: passwordRef.current.value,
      });

      console.log(result.data);

      const { token, payload } = result.data;

      if (token) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("data");
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("data", JSON.stringify(payload));
        router.push("/");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.error);
      if (
        error.response.data.error === "Password invalido" ||
        error.response.data.error === "Usuario no existe"
      ) {
        setIsErrorLogin(true);
      }
    }
  }
  //TODO completar funcion, ya captura bien los valores
  async function handleCrearCuenta(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const result = await axios.post("/api/usuarios", {
        nombre: nombreRef.current.value,
        apellido: apellidoRef.current.value,
        email: emailRef.current.value,
        usuario: userRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      });
      const response = await result.data;
      console.log(response);
      setUserCreateSucessfull(true);
      setIsLoading(false);
      setFormType("login");
    } catch (error) {
      if (error.response) {
        // La solicitud se completó y el servidor respondió con un código de estado fuera del rango 2xx
        console.log(error.response.data.error); // Aquí puedes acceder al mensaje de error
        console.log(error.response.status); // 400
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.log(error.request);
      } else {
        // Algo sucedió al configurar la solicitud
        console.log("Error", error.message);
      }
    }
  }
  //TODO completar funcion, ya captura bien los valores
  function handleRecuperarPassword(e) {
    e.preventDefault();
    console.log(emailRef.current.value);
  }

  return formType === "login" ? (
    <div className="w-full h-auto rounded-lg flex flex-col items-center p-10">
      <h3 className="text-4xl mb-5 font-extralight">Acceso</h3>
      <form
        onSubmit={handleLogin}
        className="p-4 rounded-lg flex flex-col w-full gap-4"
      >
        <label htmlFor="username" className="font-light text-xl">
          Nombre de usuario
        </label>
        <input
          type="text"
          ref={userRef}
          className="p-2 rounded-lg text-black"
        />
        <label htmlFor="password" className="font-light text-xl">
          Contraseña
        </label>
        <input
          type="password"
          ref={passwordRef}
          className="p-2 rounded-lg text-black"
        />
        {isErrorLogin && (
          <p className="text-red-500 font-medium border rounded-lg p-3 text-center bg-orange-100 ">
            Credenciales invalidas!
          </p>
        )}
        {userCreateSucessfull && (
          <p className="text-green-700 font-medium border rounded-lg p-3 text-center bg-green-100 ">
            Cuenta creada con exito!
          </p>
        )}
        {isLoading ? (
          <div role="status" className="self-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
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
        ) : (
          <button className="tracking-wider border mt-5 border-white w-fit self-center px-3 py-2 rounded-lg text-xl hover:bg-white hover:text-primary transition-all duration-200">
            Ingresar
          </button>
        )}
      </form>
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className="text-lg hover:text-sky-700 transition-all duration-200"
          onClick={() => changeFormType("recover")}
        >
          ¿Olvidó su contraseña?
        </button>
        <button
          className="text-lg hover:text-sky-700 transition-all duration-200"
          onClick={() => changeFormType("signin")}
        >
          Quiero registrarme
        </button>
      </div>
    </div>
  ) : formType === "signin" ? (
    <div className="w-full h-auto rounded-lg flex flex-col items-center p-10">
      <h3 className="text-4xl mb-5 font-extralight">Crear nueva cuenta</h3>
      <form
        onSubmit={handleCrearCuenta}
        className="p-4 rounded-lg flex flex-col w-full gap-4"
      >
        <div className="flex w-full gap-2">
          <div>
            <label htmlFor="nombre" className="font-light text-xl">
              Nombre
            </label>
            <input
              type="text"
              ref={nombreRef}
              className="p-2 rounded-lg text-black"
            />
          </div>
          <div>
            <label htmlFor="apellido" className="font-light text-xl">
              Apellido
            </label>
            <input
              type="text"
              ref={apellidoRef}
              className="p-2 rounded-lg text-black"
            />
          </div>
        </div>
        <label htmlFor="email" className="font-light text-xl">
          Correo Electrónico
        </label>
        <input
          type="email"
          ref={emailRef}
          className="p-2 rounded-lg text-black"
        />
        <label htmlFor="username" className="font-light text-xl">
          Nombre de usuario
        </label>
        <input
          type="text"
          ref={userRef}
          className="p-2 rounded-lg text-black"
        />
        <label htmlFor="password" className="font-light text-xl">
          Contraseña
        </label>
        <input
          type="password"
          ref={passwordRef}
          className="p-2 rounded-lg text-black"
        />
        <label htmlFor="confirmPassword" className="font-light text-xl">
          Confirmar contraseña
        </label>
        <input
          type="password"
          ref={confirmPasswordRef}
          className="p-2 rounded-lg text-black"
        />
        {isLoading ? (
          <div role="status" className="self-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
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
        ) : (
          <button className="tracking-wider border mt-5 border-white w-fit self-center px-3 py-2 rounded-lg text-xl hover:bg-white hover:text-primary transition-all duration-200">
            Confirmar
          </button>
        )}
      </form>
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className="text-lg hover:text-sky-700 transition-all duration-200"
          onClick={() => changeFormType("login")}
        >
          Ya tengo una cuenta
        </button>
      </div>
    </div>
  ) : formType === "recover" ? (
    <div className="w-full h-auto rounded-lg flex flex-col items-center p-10">
      <h3 className="text-4xl mb-5 font-extralight">Recuperar contraseña</h3>
      <form
        onSubmit={handleRecuperarPassword}
        className="p-4 rounded-lg flex flex-col w-full gap-4"
      >
        <label htmlFor="email" className="font-light text-xl">
          Correo Electrónico
        </label>
        <input
          type="email"
          ref={emailRef}
          className="p-2 rounded-lg text-black"
        />
        <button className="tracking-wider border mt-5 border-white w-fit self-center px-3 py-2 rounded-lg text-xl hover:bg-white hover:text-primary transition-all duration-200">
          Confirmar
        </button>
      </form>
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className="text-lg hover:text-sky-700 transition-all duration-200"
          onClick={() => changeFormType("signin")}
        >
          Quiero registrarme
        </button>
      </div>
    </div>
  ) : null;
}

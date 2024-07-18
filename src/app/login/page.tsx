"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function SignupPage() {
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      route.push("/");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block md:w-1/2 items-center justify-center bg-neutral-200 fixed right-0 top-0 bottom-0">
        <Image
          className="object-cover w-full h-full"
          src="/images/image-login.jpg"
          alt={""}
          width={400}
          height={200}
        />
      </div>

      <div className="md:w-1/2 flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-500">
        <h1 className="text-center text-xl font-bold">
          {loading ? "Carregando" : "Login"}
        </h1>
        <hr />
        <div>
          <label
            className="block text-white text-lg font-medium mb-2 mt-2"
            htmlFor="email"
          >
            e-mail
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="e-mail"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="password"
            className="block text-white text-lg font-medium mb-2 mt-4"
          >
            senha
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="senha"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-24">
          <button
            className="bg-blue-600 hover:bg-opacity-75 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline my-6"
            onClick={onLogin}
          >
            Login
          </button>
          <Link
            className="inline-block align-baseline font-medium text-sm text-white hover:text-opacity-70"
            href="/signup"
          >
            Não tem conta?
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client"; 
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  //A asynchronous function called when signup button is clicked
  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    }
  };

  return (
    // config of screen mx-auto max-w-sm
    <div className="flex flex-row justify-between bg-indigo-500">
      <div className="mx-auto flex flex-col justify-center content-center">
        <h3 className="text-center text-xl font-bold">Signup</h3>
        <label
          className="block text-white text-lg font-medium mb-2 mt-2"
          htmlFor="username"
        >
          username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label
          className="block text-white text-lg font-medium mb-2 mt-4"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label
          className="block text-white text-lg font-medium mb-2 mt-4"
          htmlFor="password"
        >
          senha
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="senha"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          className="bg-blue-600 hover:bg-opacity-75 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline my-6"
          onClick={onSignup}
        >
          Registrar-se
        </button>
        <Link
          className="inline-block align-baseline font-medium text-sm text-white hover:text-opacity-70"
          href="/login"
        >
          Visitar página de login
        </Link>
      </div>

      <div className="hidden md:block bg-indigo-500">
        <img
          src="https://images.pexels.com/photos/3197390/pexels-photo-3197390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          // className="h-auto max-w-full"
        />
      </div>
    </div>
  );
}
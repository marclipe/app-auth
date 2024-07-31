"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState<{
    _id: string;
    username: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user details");
    }
  };

  const logout = async () => {
    try {
      console.log("Calling logout endpoint");
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-indigo-950 min-h-96 flex flex-col items-center justify-center rounded-lg p-8">
      <div>
        <h1 className="text-white text-3xl text-center pb-4">
          {data?.username}
        </h1>
        {data ? (
          <div>
            <p>ID: {data._id}</p>
            <p>Username: {data.username}</p>
            <p>Email: {data.email}</p>
          </div>
        ) : (
          <h2 className="text-white text-xl mt-4">Bem vindo!</h2>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center gap-4">
          <button
            onClick={getUserDetails}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Detalhes
          </button>
          <button
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={logout}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

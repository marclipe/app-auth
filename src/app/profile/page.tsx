"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
  };

  return (
    <div>
      <h1>Perfil</h1>
      <h2>{data === "nothing" ? "Nothing" : data}</h2>
      <button onClick={getUserDetails}>Detalhes</button>
    </div>
  );
}

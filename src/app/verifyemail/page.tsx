"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verificar e-mail</h1>
      <h2 className="p-2 bg-orange-500 text-black rounded-sm">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">E-mail verificado</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error</h2>
        </div>
      )}
    </div>
  );
}

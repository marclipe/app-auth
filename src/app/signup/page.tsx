"use client"; 

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter(); 
  const [user, setUser] = useState({
    username: "",
    email: "", 
    password: ""
  });

  const onSignup = async() => {
    try {
      const response = await axios.post("/api/users/signup", user); 
      router.push("/login")
    } catch(error: any) {
      console.log("Signup failed", error.message)
    }
  } 

  return (
    <div>
      <label htmlFor="username">username</label>
    </div>
  );
}
"use client";
import { useRouter } from "next/navigation";
import ProfilePage from "./profile/page";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ProfilePage />
    </div>
  );
}

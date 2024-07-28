"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfilePage from "./profile/page";

export default function Home() {
  const router = useRouter();

  return (
    <div className="mx-auto flex justify-center content-center h-auto">
      {/* <h3>What you wating for?</h3> */}
      <Link href="/signup">Signup</Link>
      <ProfilePage />
    </div>
  );
}

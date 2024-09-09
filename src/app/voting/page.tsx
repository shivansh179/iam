// app/dashboard/page.js
"use client"; // Required for using client-side hooks

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // New navigation hook
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg text-center">
        {user ? (
          <h1 className="text-2xl text-black font-bold">Hello, {user.email}!</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

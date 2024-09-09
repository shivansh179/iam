import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Ensure proper imports
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { useRouter } from "next/navigation"; // For navigation
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("UID from Firebase Authentication:", user.uid);
      
      // Fetch the user's role from Firestore
      const userRef = doc(db, "users", user.uid);
      console.log("ref user:", userRef);
      console.log("Firestore Document Reference:", userRef.path);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("Firestore user data:", userData);

        // Check the role of the user
        if (userData.role === "admin") {
          router.push("/dashboard/admin"); // Redirect to admin dashboard
        } else if (userData.role === "user") {
          router.push("/dashboard/user"); // Redirect to user dashboard
        } else {
          alert("Invalid role!");
        }
      } else {
        alert("User role not assigned in Firestore!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full text-black p-2 mb-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-black p-2 mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

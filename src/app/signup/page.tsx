import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase"; // Firestore instance
import { doc, setDoc } from "firebase/firestore";

export const addUserWithRole = async (email: string, password: string, role: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore with role
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
    });

    alert(`User ${role} created successfully`);
  } catch (error) {
    console.error("Error adding user with role:", error);
    alert(error.message);
  }
};

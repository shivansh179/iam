import { useEffect, useState, ReactNode } from "react";
import { auth, db } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
 
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string; // Add requiredRole prop
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        // Fetch user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserRole(userData.role);

          // If the user doesn't have the required role, redirect them
          if (userData.role !== requiredRole) {
            router.push("/unauthorized");
          } else {
            setLoading(false);
          }
        } else {
          router.push("/unauthorized");
        }
      }
    });

    return () => unsubscribe();
  }, [router, requiredRole]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

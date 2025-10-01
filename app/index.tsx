import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import "../global.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Index() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
      if (firebaseUser) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return null;
}

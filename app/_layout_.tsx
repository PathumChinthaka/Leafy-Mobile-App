import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import "../global.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (user && !inTabsGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && inTabsGroup) {
      router.replace("/login");
    }
  }, [user, initializing, segments]);

  if (initializing) {
    return <LoadingSpinner />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

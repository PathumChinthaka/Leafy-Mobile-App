import { Stack, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

function AuthRedirectLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; 

    const inTabsGroup = segments[0] === "(tabs)";

    if (user && !inTabsGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && inTabsGroup) {
      router.replace("/login");
    }
  }, [user, loading, segments, router]);

  if (loading) return <LoadingSpinner />;

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRedirectLayout />
    </AuthProvider>
  );
}

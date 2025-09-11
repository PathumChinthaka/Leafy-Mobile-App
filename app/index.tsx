import "../global.css";
import { Redirect } from "expo-router";

export default function Index() {
  const isSignedIn = false; 
  if (!isSignedIn) return <Redirect href="/signin/index" />;
  return <Redirect href="/(tabs)/home" />;
}

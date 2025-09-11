import "../global.css";
import { Redirect } from "expo-router";

export default function Index() {
  const isSignedIn = true; 

  if (!isSignedIn) {
    return <Redirect href="/signin" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

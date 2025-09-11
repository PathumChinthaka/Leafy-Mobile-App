import "../global.css";
import { NavigationIndependentTree } from "@react-navigation/native";
import AppNavigator from "@/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationIndependentTree>
      <AppNavigator />
    </NavigationIndependentTree>
  );
}

import { View, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { authenticate } from "../../firebase/configuration";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(authenticate);
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className="text-white text-2xl font-bold mb-6">Profile</Text>

      {user && (
        <View className="mb-6 items-center">
          <Text className="text-white text-lg">Logged in as:</Text>
          <Text className="text-[#38e07b] text-xl font-semibold">
            {user.email}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="w-full bg-[#38e07b] py-3 rounded-2xl items-center"
        onPress={handleLogout}
      >
        <Text className="text-black text-lg font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

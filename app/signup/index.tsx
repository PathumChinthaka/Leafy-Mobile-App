import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Registration Failed");
      } else {
        Alert.alert("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black px-6">
      <View className="items-center mt-12 mb-6">
        <ImageBackground
          source={require("../../assets/images/Sign-in-Screen-Img.jpg")}
          style={styles.bg}
        />
        <Text className="text-white text-2xl font-bold mt-4">
          Create Account
        </Text>
      </View>

      <View className="space-y-4">
        <Input
          placeholder="Full Name"
          value={displayName}
          onChangeText={setDisplayName}
        />

        <Input placeholder="Email" value={email} onChangeText={setEmail} />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        className="w-full p-4 mt-6 rounded-xl"
        style={{ backgroundColor: "#38e07b" }}
      >
        <Text className="text-center text-black font-bold text-lg">
          {loading ? "Creating..." : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")} className="mt-6">
        <Text className="text-center text-gray-400">
          Already have an account? <Text className="text-[#38e07b]">Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

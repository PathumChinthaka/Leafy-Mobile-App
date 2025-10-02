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
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Button from "@/components/Button/Button";
import { isValidEmail } from "@/util/methods";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "User name and password is required");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.replace("/login");
    } catch (e: any) {
      const err = e as FirebaseError;
      setLoading(false);
      alert("Registration failed: " + err.message);
    } finally {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setConfirmPassword("");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/signup-screen-img.jpg")}
        style={styles.bg}
      />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.form}>
        <Input
          placeholder="Username"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Sign Up" onPress={handleRegister} />
      </View>
      <TouchableOpacity
        onPress={() => {
          router.replace("/login");
        }}
      >
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

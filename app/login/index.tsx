import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./styles";
import { auth } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useRouter } from "expo-router";
import { isValidEmail } from "@/util/methods";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUserLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCred.user.uid);
      setLoading(false);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("Sign in failed:", err);
      setLoading(false);
      Alert.alert("Log in Failed", "Invalid User name or Password", [
        { text: "OK" },
      ]);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Sign-in-Screen-Img.jpg")}
        style={styles.bg}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.form}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Log In" onPress={handleUserLogin} />
      </View>
      <TouchableOpacity
        onPress={() => {
          router.replace("/signup");
        }}
      >
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./styles";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserLogin = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCred.user.uid);
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
      <TouchableOpacity>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

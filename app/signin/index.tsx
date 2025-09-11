import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Email:", email, "Password:", password);
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
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <TouchableOpacity>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

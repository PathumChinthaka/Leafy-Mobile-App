import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./styles";

 const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = () => {
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
        <Button title="Log In" onPress={handleUserLogin} />
      </View>
      <TouchableOpacity>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

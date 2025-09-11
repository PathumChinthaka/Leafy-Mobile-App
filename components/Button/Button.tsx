import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBg,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});

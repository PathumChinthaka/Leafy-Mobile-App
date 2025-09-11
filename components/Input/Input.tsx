import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import colors from "../../theme/colors";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.inputPlaceholder}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    color: colors.textWhite,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 16,
    marginBottom: 12,
  },
});

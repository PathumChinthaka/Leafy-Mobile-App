import colors from "../../theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
    paddingBottom:75
  },
  bg: {
    width: "100%",
    height: 230,
  },
  title: {
    color: colors.textWhite,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
  },
  link: {
    color: colors.textLight,
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 8,
  },
});

export default styles;
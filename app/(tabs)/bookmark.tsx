import { colors } from "@/constants/theme";
import { SafeAreaView, Text, View } from "react-native";

export default function Bookmark() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: colors.secondary[200],
          fontFamily: "Poppins_800ExtraBold",
        }}
      >
        Bookmark
      </Text>
    </SafeAreaView>
  );
}

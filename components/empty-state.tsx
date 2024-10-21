import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./custom-button";
import { colors } from "@/constants/theme";

interface Props {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{
          width: 270,
          height: 216,
        }}
      />

      <Text
        style={{
          fontSize: 16,
          lineHeight: 20,
          fontFamily: "Poppins_500Medium",
          color: colors.gray[100],
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          lineHeight: 28,
          fontFamily: "Poppins_600SemiBold",
          marginTop: 4,
          textAlign: "center",
          color: "#fff",
        }}
      >
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        style={{
          width: "100%",
          marginVertical: 20,
        }}
      />
    </View>
  );
};

export default EmptyState;

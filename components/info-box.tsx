import { colors } from "@/constants/theme";
import { View, Text } from "react-native";

interface Props {
  title: string | number;
  subtitle?: string;
  containerStyles?: {};
  titleStyles?: {};
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: Props) => {
  return (
    <View style={containerStyles}>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontFamily: "Poppins_600SemiBold",
          ...titleStyles,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.gray[100],
          textAlign: "center",
          fontFamily: "Poppins_400Regular",
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;

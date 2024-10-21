import { colors } from "@/constants/theme";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  style?: {};
  isLoading?: boolean;
  textStyle?: {};
}

export default function CustomButton({
  style,
  isLoading,
  title,
  handlePress,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: colors.secondary.DEFAULT,
        borderRadius: 12,
        minHeight: 62,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        opacity: isLoading ? 0.5 : undefined,
        ...style,
      }}
      disabled={isLoading}
    >
      <Text
        style={{
          color: colors.primary,
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

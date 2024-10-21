import { icons, images } from "@/constants";
import { colors } from "@/constants/theme";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Pressable } from "react-native";

interface Props {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: {};
  keyboardType?: string;
  placeholder?: string;
}

export default function FormField({
  title,
  value,
  otherStyles,
  placeholder,
  handleChangeText,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 2,
        ...otherStyles,
      }}
    >
      <Text style={{ fontSize: 16, lineHeight: 24, color: colors.gray[100] }}>
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          height: 64,
          borderWidth: 2,
          borderColor: isFocused ? colors.secondary.DEFAULT : colors.black[200],
          paddingHorizontal: 16,
          backgroundColor: colors.black[100],
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: "#fff",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            lineHeight: 24,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                zIndex: 10,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

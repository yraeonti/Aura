import { icons, images } from "@/constants";
import { colors } from "@/constants/theme";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Pressable } from "react-native";

interface Props {
  otherStyles?: {};
  placeholder?: string;
  initialQuery?: string;
}

export default function SearchInput({
  otherStyles,
  placeholder,
  initialQuery,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const [query, setQuery] = useState(initialQuery || "");

  const pathname = usePathname();
  return (
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
        ...otherStyles,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          color: "#fff",
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
          lineHeight: 24,
          height: "100%",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

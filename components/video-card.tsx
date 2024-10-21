import { Text, View } from "react-native";
import { icons } from "@/constants";
import { Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { colors } from "@/constants/theme";
import {
  Video,
  ResizeMode,
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";

interface Props extends Models.Document {
  $createdAt: string;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
  $id: string;
  creator: {
    avatar: string;
    email: string;
    username: string;
    $id: string;
    $createdAt: string;
  };
}

export default function VideoCard({
  $id,
  title,
  video,
  thumbnail,
  prompt,
  creator: { avatar, email, username },
}: Props) {
  const [play, setPlay] = useState(false);

  // useEffect(() => {
  //   // Set audio mode to allow sound to play
  //   Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //     interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  //     playsInSilentModeIOS: true, // This is key for iOS devices
  //     shouldDuckAndroid: true,
  //     interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  //     playThroughEarpieceAndroid: false,
  //   });
  // }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 56,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              borderColor: colors.secondary.DEFAULT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              marginStart: 12,
              columnGap: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 14,
                color: "#FFF",
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray[100],
                fontFamily: "Poppins_400Regular",
              }}
              numberOfLines={1}
            >
              {/* {creator} */}
            </Text>
          </View>
        </View>

        <View style={{ paddingVertical: 8 }}>
          <Image
            source={icons.menu}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          isMuted={false}
          style={{
            width: "100%",
            height: 288,
            borderRadius: 33,
            marginTop: 12,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false);
              }
            } else {
              console.log("palybacl error", status.error);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 14,
            marginVertical: 12,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              marginTop: 12,
            }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{
              width: 48,
              height: 48,
              position: "absolute",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

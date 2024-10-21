import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { useGlobalContext } from "@/context/global-provider";
import { colors } from "@/constants/theme";
import { useSWRConfig } from "swr";

type TForm = {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
};

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<TForm>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    let permission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted)
        return Alert.alert("Not Allowed", "Media Access not granted");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };

  const submit = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user?.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      mutate("all_posts");
      mutate("latest_posts");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 16,
          marginVertical: 18,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "#fff",
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={{
            marginTop: 34,
          }}
        />

        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.gray[100],
              fontFamily: "Poppins_500Medium",
              marginRight: 4,
            }}
          >
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{
                  width: "100%",
                  height: 256,
                  borderRadius: 16,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 160,
                  paddingHorizontal: 16,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.black[200],
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: colors.secondary[100],
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    style={{
                      width: "50%",
                      height: "50%",
                    }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.gray[100],
              fontFamily: "Poppins_500Medium",
            }}
          >
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 256,
                  borderRadius: 16,
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: colors.black[100],
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: colors.black[200],
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[100],
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={{
            marginTop: 28,
          }}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          style={{
            marginTop: 28,
          }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

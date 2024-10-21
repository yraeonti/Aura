import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useSWR from "swr";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";
import EmptyState from "@/components/empty-state";
import VideoCard from "@/components/video-card";
import { colors } from "@/constants/theme";
import InfoBox from "@/components/info-box";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useSWR(user ? (user as any).$id : null, getUserPosts);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  const data = posts ?? [];

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        height: "100%",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...(item as any)} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              marginBottom: 48,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              onPress={logout}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 40,
              }}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: 56,
                height: 56,
                borderWidth: 1,
                borderColor: colors.secondary.DEFAULT,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                style={{
                  width: "90%",
                  height: "90%",
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username as string}
              containerStyles={{
                marginTop: 20,
              }}
              titleStyles={{
                fontSize: 16,
              }}
            />

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <InfoBox
                title={`${data.length}`}
                subtitle="Posts"
                titleStyles={{
                  fontSize: 24,
                }}
                containerStyles={{
                  marginRight: 32,
                }}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={{
                  fontSize: 24,
                }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

import { colors } from "@/constants/theme";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { useState } from "react";
import VideoCard from "@/components/video-card";
import useSWR from "swr";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

export default function Home() {
  const { user } = useGlobalContext();
  const {
    isLoading,
    data: allPosts,
    mutate,
    isValidating,
  } = useSWR("all_posts", getAllPosts, {
    onError: (err, key) => {
      Alert.alert("Error", err.message);
    },
  });

  const {
    // isLoading,
    data: latestPosts,
  } = useSWR("latest_posts", getLatestPosts, {
    onError: (err, key) => {
      Alert.alert("Error", err.message);
    },
  });

  const data = allPosts ?? [];

  const listHeader = (posts: any[]) => (
    <View
      style={{
        marginVertical: 24,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "row",
          marginBottom: 24,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
              lineHeight: 20,
              color: colors.gray[100],
            }}
          >
            Welcome back
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 24,
              lineHeight: 32,
              color: "#fff",
            }}
          >
            {user?.username}
          </Text>
        </View>

        <View style={{ marginTop: 6 }}>
          <Image
            source={images.logoSmall}
            style={{
              width: 36,
              height: 40,
            }}
            resizeMode="contain"
          />
        </View>
      </View>

      <SearchInput placeholder="Search for a video topic" />

      <View
        style={{
          width: "100%",
          flex: 1,
          paddingTop: 20,
          paddingBottom: 32,
        }}
      >
        <Text
          style={{
            color: colors.gray[100],
            fontSize: 18,
            lineHeight: 24,
            fontFamily: "Poppins_400Regular",
            marginBottom: 12,
          }}
        >
          Latest Videos
        </Text>

        <Trending posts={posts} />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        height: "100%",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => <VideoCard {...(item as any)} />}
        ListHeaderComponent={() => listHeader(latestPosts ?? [])}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one" />
        )}
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={mutate} />
        }
      />
    </SafeAreaView>
  );
}

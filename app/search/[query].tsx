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
import { getAllPosts, getLatestPosts, searchPosts } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const { query } = useLocalSearchParams();
  const {
    isLoading,
    data: posts,
    mutate,
    isValidating,
  } = useSWR(query ? query : null, searchPosts, {
    onError: (err, key) => {
      Alert.alert("Error", err.message);
    },
  });

  const data = posts ?? [];

  const listHeader = () => (
    <View
      style={{
        marginVertical: 24,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 14,
          lineHeight: 20,
          color: colors.gray[100],
        }}
      >
        Search Results
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 24,
          lineHeight: 32,
          color: "#fff",
        }}
      >
        {query}
      </Text>

      <View style={{ marginTop: 24, marginBottom: 32 }}>
        <SearchInput
          placeholder="Search for a video topic"
          initialQuery={query as string}
        />
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
        ListHeaderComponent={() => listHeader()}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for search query"
          />
        )}
      />
    </SafeAreaView>
  );
}

import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { shadows } from "@/constants/theme";

interface Props {
  posts: { [key: string]: any }[];
}

const zoomIn = {
  0: {
    transform: [
      {
        scale: 0.9,
      },
    ],
  },
  1: {
    transform: [
      {
        scale: 1,
      },
    ],
  },
};

const zoomOut = {
  0: {
    transform: [
      {
        scale: 1,
      },
    ],
  },
  1: {
    transform: [
      {
        scale: 0.9,
      },
    ],
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: { [key: string]: any };
  item: { [key: string]: any };
}) => {
  const [play, setPlay] = useState(false);

  //   console.log("activeItmems", item.video);

  return (
    <Animatable.View
      style={{
        marginRight: 20,
      }}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
          }}
          style={{
            width: 208,
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
              console.log("playback error", status.error);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
              marginVertical: 20,
              overflow: "hidden",
              ...shadows,
              shadowOpacity: 0.4,
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
    </Animatable.View>
  );
};

export default function Trending({ posts }: Props) {
  const [activeItem, setActiveItem] = useState(posts[0]);

  //   console.log("postd", posts);

  //   console.log("activeitems trending", activeItem);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    // console.log("viewableItemsChanged start", viewableItems);

    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170, y: 170 }}
      />
    </View>
  );
}

import { Image, ImageURISource, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { colors } from "@/constants/theme";

interface TabIconProps {
  icon: ImageURISource;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View style={styles.view}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={styles.image}
      />
      <Text
        style={{
          fontFamily: focused ? "Poppins_700Bold" : "Poppins_400Regular",
          fontSize: 10,
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 26,
    height: 26,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});

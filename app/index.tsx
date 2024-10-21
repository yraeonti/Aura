import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/global-provider";

export default function Index() {
  const { isLoggedIn, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.view1}>
          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: "100%", height: 300 }}
            resizeMode="contain"
          />

          <View style={styles.view2}>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                fontFamily: "Poppins_700Bold",
                textAlign: "center",
              }}
            >
              Discover endless possibilities with
              <Text style={{ color: colors.secondary[200] }}> Aura</Text>
            </Text>

            <Image
              source={images.path}
              style={{
                position: "absolute",
                bottom: -4,
                right: -32,
                width: 136,
                height: 15,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              color: colors.gray[100],
              fontSize: 14,
              lineHeight: 20,
              marginTop: 40,
              textAlign: "center",
            }}
          >
            {" "}
            Where creativity meets innovation embark on a journey of limitless
            exploration with aura
          </Text>

          <CustomButton
            title="Continue with email"
            handlePress={() => router.push("/sign-in")}
            style={{ marginTop: 40 }}
          />
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "100%",
  },
  view1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    paddingHorizontal: 20,
  },
  view2: {
    position: "relative",
    marginTop: 30,
  },
});

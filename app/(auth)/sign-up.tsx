import { images } from "@/constants";
import { colors } from "@/constants/theme";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import { useState } from "react";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "All fields are required!");
    }

    setIsSubmitting(true);
    try {
      const user = await createUser(form.email, form.password, form.username);

      setUser(user);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }}>
      <ScrollView
        style={{
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            minHeight: "100%",
            // height: "100%",
            paddingHorizontal: 16,
            // borderWidth: 2,
            // borderColor: colors.secondary[100],
            // marginVertical: 24,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 35 }}
          />
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              marginTop: 40,
              color: "#fff",
            }}
          >
            Sign up to Aura
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              setForm({ ...form, username: e });
            }}
            otherStyles={{ marginTop: 16 }}
            placeholder="Enter Username"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={{ marginTop: 16 }}
            keyboardType="email-address"
            placeholder="Enter Email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles={{ marginTop: 16 }}
            placeholder="Enter Password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            style={{ marginTop: 36 }}
            isLoading={isSubmitting}
          />

          <View
            style={{
              justifyContent: "center",
              paddingTop: 26,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.gray[100],
                fontFamily: "Poppins_400Regular",
              }}
            >
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              style={{
                color: colors.secondary[100],
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
              }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

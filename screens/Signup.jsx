import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupSvg from "../components/SignupSvg";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store";

const Signup = () => {
  const navigation = useNavigation();

  const handleSignup = () => {
    navigation.navigate("CreateAccountScreen");
  };
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <View className="justify-center items-center mt-5">
          <Image
            source={require("../assets/Hugosave.webp")}
            className="h-32 w-32 rounded-full mt-10"
          />
          <Text className="text-xl font-semibold text-red-600 mt-2">
            Mileage Tracker
          </Text>
          <Text className="font-medium text-lg mt-10 text-sky-900">
            Create an account to get started
          </Text>
          <TouchableOpacity
            className="bg-sky-900 h-11 w-56 rounded-lg justify-center mt-5"
            onPress={handleSignup}
          >
            <Text className="text-white font-medium text-lg text-center">
              Sign up
            </Text>
          </TouchableOpacity>
          <View className="mt-10">
            <SignupSvg />
          </View>
          <View className="w-80 -mt-5">
            <Text className="text-xl font-medium  mt-10 text-sky-900 text-center">
              Track your miles towards a prosperous financial journey!
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Signup;

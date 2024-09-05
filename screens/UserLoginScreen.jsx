import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupSvg from "../components/SignupSvg";
import { useNavigation } from "@react-navigation/native";
import ProfileComponent from "../components/ProfileComponent";
import AntDesign from "@expo/vector-icons/AntDesign";

const UserLoginScreen = () => {
  const navigation = useNavigation();

  const handleNewUser = ()=> {
    navigation.navigate('CreateAccountScreen')
  }

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <View className="justify-center items-center -mt-5">
          <Image
            source={require("../assets/Hugosave.webp")}
            className="h-32 w-32 rounded-full mt-10"
          />
          <Text className="text-xl font-semibold text-red-600 mt-2">
            Mileage Tracker
          </Text>
          <Text className="font-medium text-lg mt-10 text-sky-900">
            Select The Profile
          </Text>
          <View className="mt-28">
            <ProfileComponent />
          </View>
          <TouchableOpacity onPress={handleNewUser}>
            <View className="bg-red-400 h-16 w-16 mt-20 rounded-full justify-center items-center">
              <AntDesign name="plus" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

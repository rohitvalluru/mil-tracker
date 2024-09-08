import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProfileComponent from "../components/ProfileComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import useStore from "../store/store";

const UserLoginScreen = () => {
  const navigation = useNavigation();
  const { users, clearAllUsers } = useStore();

  const handleNewUser = () => {
    navigation.navigate("CreateAccountScreen");
  };

  // useEffect(() => {
  //   console.log("Users from store:", users);
  // }, [users]);

  const handleClearUsers = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to remove all user records?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            clearAllUsers();
            Alert.alert("Success", "All user records have been cleared.");
          },
        },
      ]
    );
  };

  const handleProfilePress = (user) => {
    navigation.navigate("LoginPasscodeScreen", { user });
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
            Select The Profile
          </Text>

          <View className="flex-wrap flex-row justify-center items-center mt-5">
            {users.slice(0, 3).map((user, index) => (
              <View key={index} className="mx-4 my-2">
                <ProfileComponent
                  name={user.name}
                  nickname={user.nickname}
                  onPress={() => handleProfilePress(user)}
                />
              </View>
            ))}
          </View>
          <View className="flex-wrap flex-row justify-center items-center mt-4">
            {users.slice(3, 5).map((user, index) => (
              <View key={index} className="mx-4 my-2">
                <ProfileComponent
                  name={user.name}
                  nickname={user.nickname}
                  onPress={() => handleProfilePress(user)}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={handleNewUser}>
            <View className="bg-sky-900 h-16 w-16 mt-20 rounded-full justify-center items-center">
              <AntDesign name="plus" size={40} color="white" />
            </View>
            <Text className="text-center mt-2 font-medium text-sky-900">
              Add User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClearUsers}
            className="bg-red-600 h-12 w-64 rounded-xl justify-center items-center mt-5"
          >
            <Text className="text-white font-semibold text-xl">
              Clear All Users
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

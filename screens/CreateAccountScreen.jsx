import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useStore from "../store/store";

const CreateAccountScreen = () => {
  const { name, nickname, email, setName, setNickname, setEmail } = useStore();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <View className="flex-1 items-center">
          <TouchableOpacity className="mr-72">
            <FontAwesome name="long-arrow-left" size={36} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-medium text-sky-800 mr-40 mt-10">
            Create Account
          </Text>
          <View>
            <View className="mt-12 w-80 ">
              <Text className="text-sky-900 font-medium text-lg px-2">
                Name
              </Text>
              <TextInput
                className=" border-gray-400 rounded-lg p-4 mb-4 bg-white h-14 border-2 mt-2 text-base font-medium"
                value={name}
                onChangeText={setName}
              />
              <Text className="text-sky-900 font-medium text-lg px-2">
                Email
              </Text>
              <TextInput
                className="border-gray-400 rounded-lg p-4 mb-4 bg-white h-14 border-2 mt-2 text-base font-medium"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text className="text-sky-900 font-medium text-lg px-2">
                Nickname
              </Text>
              <TextInput
                className="border-gray-400 rounded-lg p-4 mb-4 bg-white  h-14 border-2 mt-2 text-base font-medium"
                value={nickname}
                onChangeText={setNickname}
              />
            </View>
          </View>
          <View className="h-40 w-full bg-white absolute bottom-0">
            <View className="flex flex-row">
              <View className="flex-row items-center mt-5">
                <Pressable
                  onPress={toggleCheckbox}
                  className={`h-6 w-6 border-2 ml-5 ${
                    isChecked ? "bg-orange-500" : "bg-white"
                  } border-black justify-center items-center mr-2`}
                >
                  {isChecked && (
                    <Text className="text-white text-base font-extrabold">
                      ✓
                    </Text>
                  )}
                </Pressable>
              </View>
              <View className="w-80 mt-5">
                <Text className="text-sky-900 font-medium ml-2">
                  Tick this box to confirm you are at least 18 years old and
                  agree to our terms & conditions
                </Text>
              </View>
            </View>
            <View className="justify-center items-center">
              <TouchableOpacity className="h-12 bg-sky-900 w-64 rounded-xl justify-center items-center mt-5">
                <Text className="text-white font-semibold text-xl">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const EnterPasscodeScreen = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (value, index) => {
    if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <View className="justify-center items-center">
          <TouchableOpacity className="mr-72">
            <FontAwesome name="long-arrow-left" size={36} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-medium text-sky-800 mr-40 mt-10">
            Set a Passcode
          </Text>

          <Text className="text-xl text-sky-900 font-semibold mt-16">
            Enter a 4-Digit Passcode
          </Text>
          <Text className="text-base mt-5">
            You will need to enter at every app launch
          </Text>
          <View className="max-w-sm mx-auto mt-5">
            <View className="flex flex-row mb-2 space-x-2">
              {inputRefs.map((inputRef, index) => (
                <TextInput
                  key={index}
                  ref={inputRef}
                  className="w-20 h-16 py-3 text-xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(value) => handleInputChange(value, index)}
                />
              ))}
            </View>
          </View>
          <Text className="text-xl text-sky-900 font-semibold mt-10">
            Confirm Passcode
          </Text>
          <View className="max-w-sm mx-auto mt-10">
            <View className="flex flex-row mb-2 space-x-2">
              {inputRefs.map((inputRef, index) => (
                <TextInput
                  key={index}
                  ref={inputRef}
                  className="w-20 h-14 py-3 text-xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(value) => handleInputChange(value, index)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity className="h-12 bg-sky-900 w-64 rounded-xl justify-center items-center mt-16">
            <Text className="text-white font-semibold text-xl">Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default EnterPasscodeScreen;

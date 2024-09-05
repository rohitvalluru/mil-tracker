import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store"; // Import Zustand store

const EnterPasscodeScreen = () => {
  const inputRefs1 = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const inputRefs2 = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [confirmPasscode, setConfirmPasscode] = useState(["", "", "", ""]);

  // Access Zustand store data
  const { name, nickname, email, setPassword } = useStore();
  const navigation = useNavigation();

  const handleInputChange = (value, index, setInput, inputArray, refs) => {
    const newInput = [...inputArray];
    newInput[index] = value;
    setInput(newInput);

    if (value.length === 0 && index > 0) {
      refs[index - 1].current.focus();
    } else if (value.length === 1 && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const handleBackButton = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const handleContinue = () => {
    const passcodeString = passcode.join("");
    const confirmPasscodeString = confirmPasscode.join("");

    if (passcodeString === confirmPasscodeString) {
      setPassword(passcodeString); // Store the passcode

      // Log user details and password
      console.log("User Details:");
      console.log(`Name: ${name}`);
      console.log(`Nickname: ${nickname}`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${passcodeString}`);

      Alert.alert("Success", "Passcode set successfully!");
      navigation.navigate("NextScreen"); // Replace with your target screen
    } else {
      Alert.alert("Error", "Passcodes do not match. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <View className="justify-center items-center">
          <TouchableOpacity className="mr-72" onPress={handleBackButton}>
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
              {inputRefs1.map((inputRef, index) => (
                <TextInput
                  key={index}
                  ref={inputRef}
                  className="w-20 h-16 py-3 text-xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    handleInputChange(
                      value,
                      index,
                      setPasscode,
                      passcode,
                      inputRefs1
                    )
                  }
                  value={passcode[index]}
                />
              ))}
            </View>
          </View>
          <Text className="text-xl text-sky-900 font-semibold mt-10">
            Confirm Passcode
          </Text>
          <View className="max-w-sm mx-auto mt-10">
            <View className="flex flex-row mb-2 space-x-2">
              {inputRefs2.map((inputRef, index) => (
                <TextInput
                  key={index}
                  ref={inputRef}
                  className="w-20 h-14 py-3 text-xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    handleInputChange(
                      value,
                      index,
                      setConfirmPasscode,
                      confirmPasscode,
                      inputRefs2
                    )
                  }
                  value={confirmPasscode[index]}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            className="h-12 bg-sky-900 w-64 rounded-xl justify-center items-center mt-16"
            onPress={handleContinue}
          >
            <Text className="text-white font-semibold text-xl">Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default EnterPasscodeScreen;

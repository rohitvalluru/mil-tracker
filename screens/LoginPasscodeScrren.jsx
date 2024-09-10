import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useState, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import useStore from "../store/store";

const LoginPasscodeScreen = ({ setIsAuthenticated }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const { users, setCurrentUser } = useStore();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params; // Get user from params

  const handleInputChange = (value, index) => {
    const newInput = [...passcode];
    newInput[index] = value;
    setPasscode(newInput);

    if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const passcodeString = passcode.join("");

    if (passcodeString === user.password) {
      // Compare with the stored passcode
      setCurrentUser(user);
      Alert.alert("Success", "You are successfully logged in!");
      setIsAuthenticated(true);

      navigation.navigate("BottomTabs");
      // Navigate to the next screen or perform additional actions
    } else {
      Alert.alert("Error", "Invalid passcode. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="justify-center items-center mt-12">
              <Text className="text-2xl font-medium text-red-600 mt-10">
                Welcome back!
              </Text>
              <Text className="mt-16 text-lg font-medium text-sky-900">
                Enter your 4-Digit Passcode
              </Text>
              <View className="max-w-sm mx-auto mt-10">
                <View className="flex flex-row mb-2 space-x-2">
                  {inputRefs.map((inputRef, index) => (
                    <TextInput
                      key={index}
                      ref={inputRef}
                      className="w-20 h-16 py-3 text-xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={(value) => handleInputChange(value, index)}
                      value={passcode[index]}
                    />
                  ))}
                </View>
              </View>
              <Text className="mt-5 text-base font-normal">
                Just checking it's really you!
              </Text>
              <TouchableOpacity
                onPress={handleSubmit}
                className="h-12 bg-sky-900 w-64 rounded-xl justify-center items-center mt-16"
              >
                <Text className="text-white font-semibold text-xl">Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginPasscodeScreen;

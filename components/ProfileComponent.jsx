import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useStore from "../store/store";

const ProfileComponent = ({ onPress, name, nickname }) => {
  // Retrieve the nickname from the store
  
  // Function to return the first letter of the nickname
  const nickNameFirstLetter = (nickname) => {
    if (!nickname || nickname.length === 0) return ""; // Handle undefined or empty nickname
    return nickname.charAt(0); // Return the first letter of the nickname
  };

  // Get the first letter of the nickname
  const nickNameLetter = nickNameFirstLetter(nickname);

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="justify-center items-center mt-16">
        <View className="justify-center items-center h-7 w-20">
          <View className="bg-red-400 h-20 w-20 rounded-full justify-center items-center">
            <Text className="text-4xl font-normal text-white">
              {nickNameLetter || "A"}
            </Text>
          </View>
          <Text className="text-center text-base font-semibold truncate">
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ProfileComponent = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="justify-center items-center mt-16">
        <View className="justify-center items-center h-7 w-20">
          <View className="bg-white h-20 w-20 rounded-full"></View>
          <Text className="text-center text-base font-semibold truncate">
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;

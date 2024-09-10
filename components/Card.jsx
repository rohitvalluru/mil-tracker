import { View, Text, Image } from "react-native";
import React from "react";
import useStore from "../store/store";

const Card = ({ vehicleName, engineCC, vehicleType, imageUri }) => {
  return (
    <View className="justify-center items-center mt-8">
      <View className="bg-gray-200 h-52 w-80 bg-cover rounded-xl">
        <Image source={{ uri: imageUri }} className="h-40 w-80" />
        <View className="flex flex-row justify-center items-center px-4">
          <View className="flex-1">
            <Text
              numberOfLines={1}
              className="text-sky-900 font-semibold text-lg"
            >
              {vehicleName}
            </Text>
            <Text numberOfLines={1} className="text-gray-500 font-semibold">
              {vehicleType}
            </Text>
          </View>
          <Text className="text-sky-900 font-semibold text-base">
            {engineCC}cc
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

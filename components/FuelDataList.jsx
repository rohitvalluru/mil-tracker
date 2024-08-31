import { View, Text } from 'react-native';
import React from 'react';

const FuelDataList = ({ date, liters, price }) => {
  return (
    <View className="justify-center mt-2 w-80 h-16 bg-white rounded-xl border-2 border-orange-500">
      <View className="flex flex-row items-center">
      <Text style={{ fontSize: 25}} className="px-4">💸</Text>
        <View className="flex flex-col">
          <Text className="font-semibold text-base text-gray-600">{date}</Text>
          <Text className="font-medium text-gray-400">{liters} L</Text>
        </View>
        <Text className="text-2xl text-gray-600 font-bold px-8">$ {price}</Text>
      </View>
    </View>
  );
};

export default FuelDataList;

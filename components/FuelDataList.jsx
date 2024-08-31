// FuelDataList.js
import { View, Text } from 'react-native';
import React from 'react';

const FuelDataList = ({ records }) => {
  return (
    <>
      {records.map((record, index) => (
        <View key={index} className="justify-center mt-2 w-80 h-14 bg-white rounded-xl border-2 border-orange-500">
          <View className="flex flex-row items-center">
            <Text style={{ fontSize: 25 }} className="px-4">💸</Text>
            <View className="flex flex-col">
              <Text className="font-semibold text-base text-gray-600">{new Date(record.refuelDate).toDateString()}</Text>
              <Text className="font-medium text-gray-400">{record.liters} L</Text>
            </View>
            <Text className="text-2xl text-gray-600 font-bold px-8">$ {record.moneySpent}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default FuelDataList;

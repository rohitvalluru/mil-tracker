import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import useStore from "../store/store";
import BarChartComponent from "../components/BarChartComponent";
import MileageModal from "../components/MileageModal";
import Ionicons from "@expo/vector-icons/Ionicons";

const PerformanceScreen = () => {
  const { vehicles, addFuelData } = useStore(); // Assuming `addFuelData` action is implemented
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSaveFuelData = (data) => {
    addFuelData(data); // Save data to the store
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <Text className="text-2xl font-bold m-4 text-center text-sky-800">
          Performance
        </Text>
        <View className="border-t-2 border-gray-300 my-4 w-full -mt-1"></View>
        <BarChartComponent />
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="flex flex-row justify-center items-center h-14 w-44 bg-sky-900 mt-32 rounded-xl"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={28} color="white" />
            <Text className="text-white px-2 text-base font-semibold mr-2">
              Add Mileage
            </Text>
          </TouchableOpacity>
          <MileageModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSaveFuelData}
            selectedVehicle={selectedVehicle}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PerformanceScreen;

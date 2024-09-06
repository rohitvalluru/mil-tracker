import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import useStore from "../store/store";
import FuelDataList from "../components/FuelDataList";
import ModalComponent from "../components/ModalComponent";

const RefuellingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    refuelRecords = {},
    clearrefuelrecordsforvehicle,
    selectedVehicle,
  } = useStore();

  // Get records for the selected vehicle
  const records = selectedVehicle
    ? refuelRecords[selectedVehicle.vehicleName] || []
    : [];

  // Filter only refueling records (ignore mileage-only records)
  const fuelRecords = records.filter(
    (record) => record.refuelDate && record.liters && record.moneySpent
  );

  const handleClearRecords = () => {
    if (!selectedVehicle) {
      Alert.alert("Error", "Please select a vehicle first.");
      return;
    }

    Alert.alert(
      "Confirm",
      "Are you sure you want to delete all Fuel Records for this vehicle?",
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => {
            clearrefuelrecordsforvehicle(selectedVehicle.vehicleName);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
          <View className="justify-center items-center">
            {fuelRecords.length > 0 && (
              <View className="mt-5">
                <FuelDataList
                  records={fuelRecords}
                  selectedVehicle={selectedVehicle}
                />
              </View>
            )}
            <TouchableOpacity
              className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white text-base font-semibold mr-2">
                Add Refuelling
              </Text>
            </TouchableOpacity>
            <ModalComponent
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
            <TouchableOpacity
              className="flex flex-row justify-center items-center h-10 w-36 bg-red-600 mt-10 rounded-lg"
              onPress={handleClearRecords}
            >
              <Text className="text-white text-base font-semibold mr-2">
                Clear Records
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RefuellingScreen;

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../store/store";
import FuelDataList from "../components/FuelDataList";
import ModalComponent from "../components/ModalComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const RefuellingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    refuelRecords = {},
    clearrefuelrecordsforvehicle,
    selectedVehicle,
    currentUser,
    userVehicles,
  } = useStore();

  const vehicles = currentUser ? userVehicles[currentUser.email] || [] : [];
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <Text className="text-2xl font-bold m-4 text-center text-sky-800">
            Fuel Spends
          </Text>
          <View className="border-t-2 border-gray-300 my-4 w-full -mt-1"></View>
          <View className="flex-1 justify-center items-center">
            <View className="mt-5 justify-center items-center">
              {vehicles.length > 0 && (
                <>
                  {fuelRecords.length > 0 && (
                    <View className="mt-5 justify-center items-center">
                      <FuelDataList
                        records={fuelRecords}
                        selectedVehicle={selectedVehicle}
                      />
                      <TouchableOpacity
                        className="flex flex-row justify-center items-center h-10 w-40 bg-red-600 mt-10 rounded-lg"
                        onPress={handleClearRecords}
                      >
                        <MaterialCommunityIcons
                          name="delete-empty"
                          size={24}
                          color="white"
                        />
                        <Text className="text-white text-base font-semibold px-2 mr-2">
                          Clear Records
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
            <TouchableOpacity
              className="flex flex-row justify-center items-center h-14 w-44 bg-sky-900 mt-10 rounded-xl"
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add-circle" size={28} color="white" />
              <Text className="text-white px-2 text-base font-semibold mr-2">
                Add Refuelling
              </Text>
            </TouchableOpacity>
            <ModalComponent
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RefuellingScreen;

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../store/store";
import FuelDataList from "../components/FuelDataList";
import ModalComponent from "../components/ModalComponent";
import DropdownComponent from "../components/DropdownComponent";

const RefuellingScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { vehicles, refuelRecords, clearrefuelrecordsforvehicle } = useStore();

  // Handle vehicle selection from dropdown
  const handleVehicleSelection = (vehicleName) => {
    const vehicle = vehicles.find((v) => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle);
  };

  // Get records for the selected vehicle
  const records = selectedVehicle
    ? refuelRecords[selectedVehicle.vehicleName] || []
    : [];

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
            // Force a re-render by updating the state
            setSelectedVehicle({ ...selectedVehicle });
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
            <DropdownComponent
              useLocalStorage={true}
              onChangeValue={handleVehicleSelection}
              placeholder="Choose Vehicle"
            />
            <View className="mt-4">
              <FuelDataList records={records} />
            </View>
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

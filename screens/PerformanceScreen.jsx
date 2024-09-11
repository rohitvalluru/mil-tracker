import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import useStore from "../store/store";
import BarChartComponent from "../components/BarChartComponent";
import MileageModal from "../components/MileageModal";
import Ionicons from "@expo/vector-icons/Ionicons";

const PerformanceScreen = () => {
  const { addFuelData } = useStore(); // Assuming `addFuelData` action is implemented
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { currentUser, userVehicles } = useStore();

  // Get the user's vehicles
  const accountVehicles = currentUser
    ? userVehicles[currentUser.email] || []
    : [];

  // Determine marginTop based on the presence of vehicles
  const dynamicStyles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: accountVehicles.length > 0 ? 130 : 5, // Adjust marginTop based on the condition
    },
  });

  const handleSaveFuelData = (data) => {
    addFuelData(data); // Save data to the store
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 400 }}>
          <View style={dynamicStyles.container}>
            <Text className="text-2xl font-bold m-4 text-center text-sky-800">
              Performance
            </Text>
            <View className="border-t-2 border-gray-300 my-4 w-full -mt-1"></View>
            {accountVehicles.length > 0 && (
              <View className="-mt-10">
                <BarChartComponent />
              </View>
            )}
            <View className="justify-center items-center mt-24">
              <TouchableOpacity
                className="flex flex-row justify-center items-center h-14 w-44 bg-sky-900 mt-10 rounded-xl"
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
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PerformanceScreen;

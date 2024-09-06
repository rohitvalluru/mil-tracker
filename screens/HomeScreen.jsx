import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store";
import NoVehicleComponent from "../components/NoVehicleComponent";
import FuelDataList from "../components/FuelDataList";
import DropdownComponent from "../components/DropdownComponent";
import BarChartComponent from "../components/BarChartComponent";
import FuelInsights from "../components/FuelInsights";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { vehicles, refuelRecords } = useStore(); // Access vehicles and refuelRecords from the store
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State for selected vehicle

  // Get the last added vehicle
  const lastVehicle = vehicles.length > 0 ? vehicles[0] : null;

  // Handle vehicle selection from dropdown
  const handleVehicleSelection = (vehicleName) => {
    const vehicle = vehicles.find((v) => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle); // Update selected vehicle
  };

  const handleAddVehicleHome = () => {
    if (selectedVehicle) {
      navigation.navigate("Refuelling", {
        vehicleId: selectedVehicle.vehicleName,
      });
    }
  };

  useEffect(() => {
    // Set the last vehicle as the default selected vehicle if available
    if (lastVehicle && !selectedVehicle) {
      setSelectedVehicle(lastVehicle);
    }
  }, [lastVehicle, selectedVehicle]);

  // Filter records for the selected vehicle
  const records = selectedVehicle
    ? refuelRecords[selectedVehicle.vehicleName] || []
    : [];

  const fuelRecords = records.filter(
    (record) => record.refuelDate && record.liters && record.moneySpent
  );

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View className="flex justify-center items-center">
            <Image
              source={require("../assets/Hugosave.webp")}
              className="h-16 w-16 rounded-full mt-10"
            />
            <Text className="text-2xl text-red-600 font-semibold mt-5">
              Hi Snack Muncher,
            </Text>
            <Text className="text-xl text-sky-900 font-medium text-center mt-5">
              {lastVehicle
                ? "Here is everything about your vehicle"
                : "Track your miles towards a prosperous financial journey"}
            </Text>
            {lastVehicle ? (
              <>
                <DropdownComponent
                  useLocalStorage={true}
                  onChangeValue={handleVehicleSelection}
                  placeholder="Choose Vehicle"
                />
                {selectedVehicle && (
                  <View className="h-44 w-80 bg-slate-500 rounded-2xl border-4 border-white">
                    <Image
                      source={{ uri: selectedVehicle.imageUri }}
                      className="h-full w-full rounded-2xl"
                      resizeMode="cover"
                    />
                  </View>
                )}

                <FuelInsights selectedVehicle={selectedVehicle} />

                {/* Display FuelDataList if a vehicle is selected */}
                <TouchableOpacity
                  className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
                  onPress={handleAddVehicleHome}
                >
                  <Text className="text-white text-base font-semibold mr-2">
                    Add Refuelling
                  </Text>
                  <AntDesign name="arrowright" size={18} color="white" />
                </TouchableOpacity>
                {selectedVehicle && (
                  <View className="w-full h-3/4 justify-center items-center">
                    <BarChartComponent selectedVehicle={selectedVehicle} />
                    {fuelRecords.length > 0 && (
                      <View className="-mt-44">
                        <Text className="text-lg font-semibold text-center text-sky-800">
                          Refuelling history
                        </Text>
                        <FuelDataList records={fuelRecords.slice(0, 5)} />
                      </View>
                    )}
                  </View>
                )}
              </>
            ) : (
              <NoVehicleComponent />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 550,
    paddingTop: 220, // Adjust if needed
    alignItems: "center", // Center content if desired
  },
});

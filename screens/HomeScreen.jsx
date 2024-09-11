import React, { useEffect } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
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
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    refuelRecords,
    selectedVehicle,
    setSelectedVehicle,
    currentUser,
    userVehicles,
  } = useStore(); // Access refuelRecords, selectedVehicle, etc. from the store

  // Debugging: Log current user and userVehicles

  const [isUserSelection, setIsUserSelection] = React.useState(false);
  // Get vehicles for the current user based on their email
  const vehicles = currentUser ? userVehicles[currentUser.email] || [] : [];

  // Debugging: Log vehicles for the current user

  // Get the last added vehicle for the current user
  const lastVehicle =
    vehicles.length > 0 ? vehicles[vehicles.length - 1] : null;

  // Debugging: Log the last vehicle

  // Handle vehicle selection from dropdown and store it globally
  const handleVehicleSelection = (vehicleName) => {
    console.log("Vehicle selected from HomeDropdown:", vehicleName);

    const vehicle = vehicles.find(
      (v) => v.vehicleName.trim() === vehicleName.trim()
    );

    if (vehicle) {
      setSelectedVehicle(vehicle);
      setIsUserSelection(true); // Ensure manual selection is registered

      // Log the selected vehicle
      console.log("Vehicle found and set in state:", vehicle);
    } else {
      console.log("No matching vehicle found for:", vehicleName);
    }
  };

  const handleAddVehicleHome = () => {
    if (selectedVehicle) {
      navigation.navigate("Refuelling", {
        selectedVehicle, // Pass the selected vehicle object
      });
    }
  };


  useEffect(() => {
    // If the user has not made a selection, set the default vehicle
    if (
      !isUserSelection &&
      lastVehicle &&
      (!selectedVehicle ||
        selectedVehicle.vehicleName !== lastVehicle.vehicleName)
    ) {
      setSelectedVehicle(lastVehicle);
    }
  }, [lastVehicle, selectedVehicle, isUserSelection]); // Ensure dependencies are correct
  // Dependencies

  // Filter records for the selected vehicle
  const records = selectedVehicle
    ? refuelRecords[selectedVehicle.vehicleName] || []
    : [];

  const fuelRecords = records.filter(
    (record) => record.refuelDate && record.liters && record.moneySpent
  );

  // Debugging: Log filtered records and selected vehicle
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View className="flex justify-center items-center mt-10">
            <Image
              source={require("../assets/Hugosave.webp")}
              className="h-16 w-16 rounded-full"
            />
            <Text className="text-2xl text-red-600 font-semibold mt-5">
              Hi {currentUser?.name}
            </Text>
            <Text className="text-xl text-sky-900 font-medium text-center mt-5">
              {lastVehicle
                ? "Here is everything about your vehicle"
                : "Track your miles towards a prosperous financial journey"}
            </Text>
            {lastVehicle ? (
              <>
                <DropdownComponent
                  type="userVehicle"
                  onChangeValue={handleVehicleSelection}
                />
                {selectedVehicle && (
                  <View className="h-44 w-80 bg-slate-500 rounded-2xl border-4 border-white">
                    <Image
                      source={{ uri: selectedVehicle.imageUri || "" }}
                      className="h-full w-full rounded-2xl"
                      resizeMode="cover"
                    />
                  </View>
                )}
                <FuelInsights selectedVehicle={selectedVehicle} />
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
                  <View className="w-full justify-center items-center">
                    {fuelRecords.length > 0 && (
                      <View className="mt-10">
                        <Text className="text-lg font-semibold text-center text-sky-800">
                          Refuelling history
                        </Text>
                        <FuelDataList records={fuelRecords.slice(0, 5)} />
                      </View>
                    )}
                    <View className="h-96">
                      <BarChartComponent selectedVehicle={selectedVehicle} />
                    </View>
                  </View>
                )}
              </>
            ) : (
              <NoVehicleComponent />
            )}
            {/* <TouchableOpacity
              className="flex flex-row justify-center items-center h-10 w-36 bg-red-600 mt-10 rounded-lg"
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="black" />
              <Text className="text-white text-base font-semibold px-2 mr-2">
                Logout
              </Text>
            </TouchableOpacity> */}
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
    paddingBottom: 250,
    alignItems: "center",
  },
});

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import useStore from "../store/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import NoVehicleComponent from "../components/NoVehicleComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const VehicleScreen = () => {
  const { currentUser, userVehicles, clearVehicleRecords } = useStore();
  const navigation = useNavigation();

  const vehicles = currentUser ? userVehicles[currentUser.email] || [] : [];

  const handleAddVehicleHome = () => {
    navigation.navigate("AddVehicle");
  };

  const handleClearVehicleRecords = () =>{
    clearVehicleRecords();
  }

  const renderItem = ({ item }) => (
    <Card
      vehicleName={item.vehicleName}
      engineCC={item.engineCC}
      vehicleType={item.vehicleType}
      imageUri={item.imageUri}
    />
  );

  const renderFooter = () => (
    <View className="items-center p-4">
      <TouchableOpacity
        className="flex flex-row justify-center items-center h-12 w-36 mt-5 bg-sky-900 rounded-xl"
        onPress={handleAddVehicleHome}
      >
        <Text className="text-white text-base font-semibold mr-2">
          Add Vehicle
        </Text>
        <AntDesign name="arrowright" size={18} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex flex-row justify-center items-center h-10 w-40 bg-red-600 mt-10 rounded-lg"
        onPress={handleClearVehicleRecords}
      >
        <MaterialCommunityIcons name="delete-empty" size={24} color="white" />
        <Text className="text-white text-base font-semibold px-2 mr-2">
          Clear Records
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient colors={["#83a4d4", "#FFFDE4"]} className="flex-1">
        <View className="flex-1">
          <Text className="text-2xl font-bold m-4 text-center text-sky-900">
            Vehicles
          </Text>
          <View className="border-t-2 border-gray-300 my-4 w-full -mt-1"></View>
          {vehicles.length > 0 ? (
            <FlatList
              data={vehicles}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={renderFooter}
              contentContainerStyle={{ flexGrow: 1 }} // Ensures content container takes full height
            />
          ) : (
            <NoVehicleComponent />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default VehicleScreen;

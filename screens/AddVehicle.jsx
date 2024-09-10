import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import InputComponent from "../components/InputComponent";
import useStore from "../store/store";
import DropdownComponent from "../components/DropdownComponent";
import CircularImagePicker from "../components/ImagePicker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const AddVehicle = () => {
  const navigation = useNavigation();

  const {
    vehicleName,
    engineCC,
    vehicleType,
    setVehicleType,
    setVehicleName,
    setEngineCC,
    imageUri,
    addVehicle,
    setImageUri,
  } = useStore();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setVehicleName("");
      setEngineCC("");
      setVehicleType("");
      setImageUri(null);
    }, [])
  );

  useEffect(() => {
    // Check if all fields are filled
    if (vehicleName && engineCC && vehicleType && imageUri) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [vehicleName, engineCC, vehicleType, imageUri]);

  const handleAddVehicle = () => {
    addVehicle({
      vehicleName,
      engineCC,
      vehicleType,
      imageUri,
    });
    navigation.navigate("VehicleAddedScreen");
  };

  const handleCancel = () => {
    navigation.navigate("HomeMain");
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#83a4d4", "#FFFDE4"]}
        className="h-screen w-screen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:100 }}>
            <View className="flex-1 justify-center items-center">
              <Text className="text-sky-900 text-2xl font-medium text-center mt-5">
                Add Vehicle
              </Text>
              <CircularImagePicker />
              <InputComponent
                placeholder="Vehicle Name"
                value={vehicleName}
                onChangeText={setVehicleName}
              />
              <DropdownComponent useLocalStorage={false} />
              <InputComponent
                placeholder="Engine CC"
                keyboardType="numeric"
                value={engineCC}
                onChangeText={setEngineCC}
              />
              <View className="flex flex-row justify-between w-80 mt-14">
                <TouchableOpacity
                  className="flex flex-row justify-center items-center h-14 w-36 text-sky-900 rounded-xl border"
                  onPress={handleCancel}
                >
                  <Text className="text-sky-900 text-base font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex flex-row justify-center items-center h-14 w-36 rounded-xl ${
                    isButtonEnabled ? "bg-sky-900" : "bg-gray-400"
                  }`}
                  disabled={!isButtonEnabled}
                  onPress={handleAddVehicle}
                >
                  <Text className="text-white text-base font-semibold">
                    Add Vehicle
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddVehicle;

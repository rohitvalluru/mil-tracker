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
  FlatList,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import InputComponent from "../components/InputComponent";
import useStore from "../store/store";
import DropdownComponent from "../components/DropdownComponent";
import CircularImagePicker from "../components/ImagePicker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";

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

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#83a4d4", "#FFFDE4"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          >
            <View style={styles.container}>
              <Text style={styles.header}>Add Vehicle</Text>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isButtonEnabled
                      ? styles.enabledButton
                      : styles.disabledButton,
                  ]}
                  disabled={!isButtonEnabled}
                  onPress={handleAddVehicle}
                >
                  <Text style={styles.buttonText}>Add Vehicle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "#003366",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
    gap: 12,
  },
  button: {
    height: 56,
    width: 144,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    borderColor: "#003366",
    borderWidth: 1,
    backgroundColor: "#FF0000",
  },
  enabledButton: {
    backgroundColor: "#003366",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddVehicle;

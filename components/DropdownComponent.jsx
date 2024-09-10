import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import useStore from "../store/store";

const DropdownComponent = ({ type = "vehicleType", onChangeValue }) => {
  const { userVehicles, currentUser, setVehicleType, setSelectedVehicle } =
    useStore();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (type === "vehicleType") {
      // Show vehicle types
      setItems([
        { label: "2 Wheeler", value: "2 Wheeler" },
        { label: "3 Wheeler", value: "3 Wheeler" },
        { label: "4 Wheeler", value: "4 Wheeler" },
        { label: "Other", value: "Other" },
      ]);
    } else if (type === "userVehicle" && currentUser) {
      // Show only the current user's vehicles
      const userVehiclesList = userVehicles[currentUser.email] || [];
      const vehicleOptions = userVehiclesList.map((vehicle) => ({
        label: vehicle.vehicleName.trim(), // Trim whitespace
        value: vehicle.vehicleName.trim(),
      }));
      setItems(vehicleOptions);
    }
  }, [type, userVehicles, currentUser]);

  const handleValueChange = (selectedValue) => {
    console.log("handleValueChange called with:", selectedValue);
    setValue(selectedValue); // Update the dropdown value
    console.log("After setValue, updated state value is:", selectedValue);

    if (type === "userVehicle") {
      const userVehiclesList = userVehicles[currentUser.email] || [];
      const selectedVehicle = userVehiclesList.find(
        (vehicle) => vehicle.vehicleName.trim() === selectedValue.trim()
      );

      if (selectedVehicle) {
        console.log("Selected vehicle before updating state:", selectedVehicle);
        setSelectedVehicle(selectedVehicle); // Only update if selectedVehicle is valid
        console.log("Vehicle selected after state update:", selectedVehicle);
      } else {
        console.log("No valid vehicle found for selection.");
      }

      if (onChangeValue) {
        onChangeValue(selectedValue); // Trigger the onChangeValue callback
      }
    } else {
      setVehicleType(selectedValue); // Update Zustand state for vehicle type

      if (onChangeValue) {
        onChangeValue(selectedValue); // Trigger the onChangeValue callback for vehicle type
      }
    }
  };

  return (
    <View className="m-5 w-80">
      <DropDownPicker
        open={open}
        value={value} // Bind the selected value to the dropdown
        items={items}
        setOpen={setOpen}
        setValue={setValue} // Directly use setValue to update the state
        onSelectItem={(item) => handleValueChange(item.value)} // Handle item selection
        setItems={setItems}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: "#fafafa",
          borderColor: open ? "blue" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
        dropDownContainerStyle={{
          backgroundColor: "#fafafa",
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
        placeholderStyle={{
          color: "gray",
          fontSize: 17,
          fontWeight: "bold",
        }}
        textStyle={{
          fontSize: 16,
        }}
        placeholder={
          type === "userVehicle" ? "Select Vehicle" : "Select Vehicle Type"
        }
      />
    </View>
  );
};

export default DropdownComponent;

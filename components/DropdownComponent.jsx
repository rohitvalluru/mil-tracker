import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
      // If type is 'vehicleType', show vehicle types
      setItems([
        { label: "2 Wheeler", value: "2 Wheeler" },
        { label: "3 Wheeler", value: "3 Wheeler" },
        { label: "4 Wheeler", value: "4 Wheeler" },
        { label: "Other", value: "Other" },
      ]);
    } else if (type === "userVehicle" && currentUser) {
      // If type is 'userVehicle', show only the current user's vehicles
      const userVehiclesList = userVehicles[currentUser.email] || [];
      const vehicleOptions = userVehiclesList.map((vehicle) => ({
        label: vehicle.vehicleName,
        value: vehicle.vehicleName,
      }));
      setItems(vehicleOptions);
    }
  }, [type, userVehicles, currentUser]);

  return (
    <View className="m-5 w-80">
      <DropDownPicker
        open={open}
        value={value} // Adjust as needed
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const selectedValue = callback();
          if (type === "userVehicle") {
            const userVehiclesList = userVehicles[currentUser.email] || [];
            setSelectedVehicle(
              userVehiclesList.find(
                (vehicle) => vehicle.vehicleName === selectedValue
              )
            ); // Update Zustand state for vehicle selection
            if (onChangeValue) {
              onChangeValue(selectedValue); // Trigger the onChangeValue callback
            }
          } else {
            setVehicleType(selectedValue); // Update Zustand state for vehicle type
            if (onChangeValue) {
              onChangeValue(selectedValue); // Trigger the onChangeValue callback for vehicle type
            }
          }
        }}
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
        placeholder={
          type === "userVehicle" ? "Select Vehicle" : "Select Vehicle Type"
        }
        placeholderStyle={{
          color: "gray",
          fontSize: 17,
          fontWeight: "bold",
        }}
        textStyle={{
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default DropdownComponent;

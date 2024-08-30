import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import useStore from '../store/store';

const DropdownComponent = ({ useLocalStorage = false }) => {
  const { vehicleType, setVehicleType, vehicles } = useStore(); // Zustand state management
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '2 Wheeler', value: '2 Wheeler' },
    { label: '3 Wheeler', value: '3 Wheeler' },
    { label: '4 Wheeler', value: '4 Wheeler' },
    { label: 'Other', value: 'Other' },
  ]);

  useEffect(() => {
    if (useLocalStorage) {
      const vehicleOptions = vehicles.map((vehicle) => ({
        label: vehicle.vehicleName, // Assuming vehicle object has a 'vehicleName' field
        value: vehicle.vehicleName,
      }));
      setItems(vehicleOptions);
    }
  }, [useLocalStorage, vehicles]);

  return (
    <View className="m-5 w-80">
      <DropDownPicker
        open={open}
        value={vehicleType}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => setVehicleType(callback())} // Corrected to ensure the function works
        setItems={setItems}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: '#fafafa',
          borderColor: open ? 'blue' : '#ccc',
          borderWidth: 1,
          borderRadius: 8,
        }}
        dropDownContainerStyle={{
          backgroundColor: '#fafafa',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
        }}
        placeholder="Vehicle Type"
        placeholderStyle={{
          color: 'gray',
          fontSize: 17,
          fontWeight: 'bold'
        }}
        textStyle={{
          // fontWeight: 'bold', // Make the selected value bold
          fontSize: 16,
        }}
        onChangeValue={(value) => {
          setVehicleType(value); // Update Zustand state
        }}
      />
    </View>
  );
};

export default DropdownComponent;

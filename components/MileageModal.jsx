import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import useStore from '../store/store';

const MileageModal = ({ visible, onClose, onSave }) => {
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { vehicles } = useStore();

  const handleSave = () => {
    const fuelData = {
      vehicleId: selectedVehicle,
      distance: parseFloat(distance),
      fuelUsed: parseFloat(fuelUsed),
      date: date.toISOString(),
    };

    onSave(fuelData);
    onClose();
  };

  // Check if all fields are filled
  const isFormComplete = distance && fuelUsed && selectedVehicle && date;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-xl w-80">
          <Text className="text-lg font-semibold mb-4 text-center text-sky-900">Add Fuel Data</Text>

          {/* Dropdown for vehicle selection */}
          <DropDownPicker
            open={openDropdown} // Control whether dropdown is open
            value={selectedVehicle} // Current selected value
            items={vehicles.map((vehicle) => ({
              label: vehicle.vehicleName,
              value: vehicle.vehicleName, // Using vehicleName as the value and key
            }))}
            placeholder="Select Vehicle"
            setOpen={setOpenDropdown} // Set dropdown open state
            setValue={setSelectedVehicle} // Set selected vehicle
            className="border border-gray-300 rounded-lg mb-4"
          />

          {/* Input fields for distance and fuel used */}
          <TextInput
            value={distance}
            onChangeText={setDistance}
            placeholder="Distance Traveled (km)"
            keyboardType="numeric"
            className="border rounded-md p-2 mb-4"
          />
          <TextInput
            value={fuelUsed}
            onChangeText={setFuelUsed}
            placeholder="Fuel Used (liters)"
            keyboardType="numeric"
            className="border rounded-md p-2 mb-4"
          />

          {/* Date picker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="p-2 border rounded-md mb-4">
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <View className="flex flex-row justify-between mt-4">
            <TouchableOpacity className="bg-red-500 p-2 rounded-lg" onPress={onClose}>
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 rounded-lg ${isFormComplete ? 'bg-sky-900' : 'bg-gray-400'}`}
              onPress={handleSave}
              disabled={!isFormComplete}
            >
              <Text className="text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MileageModal;

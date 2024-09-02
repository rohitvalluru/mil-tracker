import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import useStore from '../store/store'; // Adjust the path as needed

const ModalComponent = ({ visible, onClose }) => {
  const [moneySpent, setMoneySpent] = useState('');
  const [liters, setLiters] = useState('');
  const [refuelDate, setRefuelDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false); // For dropdown open state

  const { vehicles, addRefuelRecord } = useStore();

  const handleAddRefuelling = () => {
    const refuelRecord = {
      moneySpent,
      liters,
      refuelDate,
    };
    if (selectedVehicle) {
      addRefuelRecord(selectedVehicle, refuelRecord);
    }
    onClose();
    setMoneySpent('');
    setLiters('');
    setRefuelDate(new Date());
  };

  // Check if all fields are filled
  const isFormComplete = moneySpent && liters && selectedVehicle && refuelDate;

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-semibold mb-4 text-center text-sky-900">Add Refuelling</Text>
          
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

          <TextInput
            placeholder="Money Spent in Rs."
            keyboardType="numeric"
            value={moneySpent}
            onChangeText={setMoneySpent}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <TextInput
            placeholder="Liters of Petrol"
            keyboardType="numeric"
            value={liters}
            onChangeText={setLiters}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="border border-gray-300 rounded-lg p-2 mb-4">
            <Text>{refuelDate.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={refuelDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setRefuelDate(selectedDate);
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
              onPress={handleAddRefuelling}
              disabled={!isFormComplete}
            >
              <Text className="text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

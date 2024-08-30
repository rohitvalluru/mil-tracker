import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import useStore from '../store/store';
import DropdownComponent from '../components/DropdownComponent';
import CircularImagePicker from '../components/ImagePicker';

const AddVehicle = () => {
  const navigation = useNavigation();

  const { vehicleName, engineCC, vehicleType, setVehicleType, setVehicleName, setEngineCC, imageUri } = useStore();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    if (vehicleName && engineCC && vehicleType && imageUri) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [vehicleName, engineCC, vehicleType, imageUri]);
  
  const handleAddVehicle = () => {
    navigation.navigate('VehicleAddedScreen');
  };
  
  return (
    <View style={styles.container} className="mt-20 bg-white w-full h-full">
        <View className="flex justify-center items-center">
            <Text className="text-sky-900 text-2xl font-medium text-center mt-5">Add Vehicle</Text>           
              <CircularImagePicker/>
            <InputComponent
        placeholder="Vehicle Name"
        value={vehicleName}
        onChangeText={setVehicleName}
      />
      <DropdownComponent/>
      <InputComponent
        placeholder="Engine CC"
        keyboardType="numeric"
        value={engineCC}
        onChangeText={setEngineCC}
      />
      <View className="flex flex-row justify-between w-80 mt-14">
          <TouchableOpacity className="flex flex-row justify-center items-center h-14 w-36 text-sky-900 rounded-xl border">
            <Text className="text-sky-900 text-base font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-row justify-center items-center h-14 w-36 rounded-xl ${isButtonEnabled ? 'bg-sky-900' : 'bg-gray-400'}`}
            disabled={!isButtonEnabled}
            onPress={handleAddVehicle}
          >
            <Text className="text-white text-base font-semibold">Add Vehicle</Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 45, // Adjust as needed
    borderTopRightRadius: 45, // Adjust as needed
    borderBottomLeftRadius: 15, // Adjust as needed
    borderBottomRightRadius: 15, // Adjust as needed
  },
});

export default AddVehicle;

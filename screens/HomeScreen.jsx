import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store/store';
import Card from '../components/Card';
import NoVehicleComponent from '../components/NoVehicleComponent';
import DropdownComponent from '../components/DropdownComponent';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { vehicles } = useStore(); // Access the vehicles from the store
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State for selected vehicle

  // Get the last added vehicle
  const lastVehicle = vehicles.length > 0 ? vehicles[0] : null;

  // Handle vehicle selection from dropdown
  const handleVehicleSelection = (vehicleName) => {
    const vehicle = vehicles.find(v => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle); // Update selected vehicle
  };

  const handleAddVehicleHome = () => {
    navigation.navigate('AddVehicle');
  };

  useEffect(() => {
    // Set the last vehicle as the default selected vehicle if available
    if (lastVehicle && !selectedVehicle) {
      setSelectedVehicle(lastVehicle);
    }
  }, [lastVehicle, selectedVehicle]);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']}
        className="h-screen w-screen"
      >
        <View className="flex justify-center items-center">
          <Image
            source={require('../assets/Hugosave.webp')}
            className="h-16 w-16 rounded-full mt-10"
          />
          <Text className="text-2xl text-red-600 font-semibold mt-5">
            Hi Snack Muncher,
          </Text>
          <Text className="text-xl text-sky-900 font-medium text-center mt-5">
            {lastVehicle
              ? "Here is everything about your vehicle"
              : "Track your miles towards a prosperous financial journey"}
          </Text>
          {lastVehicle ? (
            <>
              <DropdownComponent useLocalStorage={true} onChangeValue={handleVehicleSelection} placeholderplaceholder="Choose Vehicle"/>
              {selectedVehicle && (
                <View className="h-44 w-80 bg-slate-500 rounded-2xl border-4 border-white">
                  <Image  source={{ uri: selectedVehicle.imageUri }} className="h-full w-full rounded-2xl" resizeMode="cover"/>
                </View>
              )}

              <TouchableOpacity
                className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
                onPress={handleAddVehicleHome}
              >
                <Text className="text-white text-base font-semibold mr-2">
                  Add Refuelling
                </Text>
                <AntDesign name="arrowright" size={18} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <NoVehicleComponent />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

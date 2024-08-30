import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import AddVehicle from './AddVehicle';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store/store';
import Card from '../components/Card';
import NoVehicleComponent from '../components/NoVehicleComponent';
import DropdownComponent from '../components/DropdownComponent';


const HomeScreen = () => {
  const navigation = useNavigation();
  const { vehicles } = useStore(); // Access the vehicles from the store
  

  // Get the last added vehicle
  const lastVehicle = vehicles.length > 0 ? vehicles[vehicles.length - 1] : null;


  const handleAddVehicleHome = () => {
    navigation.navigate('AddVehicle')
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
        <View className="flex justify-center items-center">
          <Image source={require('../assets/Hugosave.webp')} className="h-16 w-16 rounded-full mt-10"/>
          <Text className="text-2xl text-red-600 font-semibold mt-5 ">Hi Snack Muncher,</Text>
          <Text className="text-xl text-sky-900 font-medium text-center mt-5">{lastVehicle 
          ? "Here is everything about your vehicle"
          : "Track your miles towards a prosperous financial journey"}</Text>
          {lastVehicle ? (
  <>
    <DropdownComponent useLocalStorage={true}/>
    <Card 
      vehicleName={lastVehicle.vehicleName}
      engineCC={lastVehicle.engineCC}
      vehicleType={lastVehicle.vehicleType}
      imageUri={lastVehicle.imageUri}
    />
    <TouchableOpacity className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
      onPress={handleAddVehicleHome}>
      <Text className="text-white text-base font-semibold mr-2">Add Refuelling</Text>
      <AntDesign name="arrowright" size={18} color="white"/>
    </TouchableOpacity>
  </>
) : (
  <NoVehicleComponent/>
)}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

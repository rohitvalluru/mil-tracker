import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import AddVehicle from './AddVehicle';


const HomeScreen = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
        <View className="flex justify-center items-center">
          {/* <Image source={require('../assets/Hugosave.webp')} className="h-16 w-16 rounded-full mt-10"/>
          <Text className="text-2xl text-red-600 font-semibold mt-5 ">Hi Snack Muncher,</Text>
          <Text className="text-xl text-sky-900 font-medium text-center mt-5">Track your miles towards a prosperous financial journey</Text>
          <Image source={require('../assets/road.jpg')} className="h-48 w-48 rounded-full mt-10"/>
          <Text className="text-sky-900 text-base font-medium text-center mt-5">Add a vehicle to start tracking its refuelling & performance</Text>
          <TouchableOpacity className="flex flex-row justify-center items-center h-14 w-36 bg-sky-900 mt-10 rounded-xl">
            <Text className="text-white text-base font-semibold mr-2 bg-center bg-cover">Add Vehicle</Text>
            <AntDesign name="arrowright" size={18} color="white"/>
          </TouchableOpacity> */}
          <AddVehicle/>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

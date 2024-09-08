import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const NoVehicleComponent = () => {
    const navigation = useNavigation();

    const handleAddVehicleHome2 = () => {
        navigation.navigate('AddVehicle')
      }

  return (
    <View className="flex justify-center items-center">
      <Image source={require('../assets/road.jpg')} className="h-40 w-40 rounded-full mt-10"/>
      <Text className="text-sky-900 text-base font-medium text-center mt-5">Add a vehicle to start tracking its refuelling & performance</Text>
      <TouchableOpacity className="flex flex-row justify-center items-center h-14 w-36 bg-sky-900 mt-10 rounded-xl"
          onPress={handleAddVehicleHome2}>
            <Text className="text-white text-base font-semibold mr-2 bg-center bg-cover">Add Vehicle</Text>
            <AntDesign name="arrowright" size={18} color="white"/>
          </TouchableOpacity>
    </View>
  )
}

export default NoVehicleComponent
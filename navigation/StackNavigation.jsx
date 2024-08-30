import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddVehicle from '../screens/AddVehicle';
import VehicleAddedScreen from '../screens/VehicleAddedScreen';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="AddVehicle" component={AddVehicle} />
      <HomeStack.Screen name="VehicleAddedScreen" component={VehicleAddedScreen} />
    </HomeStack.Navigator>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddVehicle from '../screens/AddVehicle';
import VehicleAddedScreen from '../screens/VehicleAddedScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import EnterPasscodeScreen from '../screens/EnterPasscodeScreen';
import Signup from '../screens/Signup';
import UserLoginScreen from '../screens/UserLoginScreen';
import LoginPasscodeScreen from '../screens/LoginPasscodeScrren';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="AddVehicle" component={AddVehicle} />
      <HomeStack.Screen
        name="VehicleAddedScreen"
        component={VehicleAddedScreen}
      />
      {/* <HomeStack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <HomeStack.Screen
        name="EnterPasscodeScreen"
        component={EnterPasscodeScreen}
      />
      <HomeStack.Screen name="Signup" component={Signup} />
      <HomeStack.Screen name="UserLoginScreen" component={UserLoginScreen} />
      <HomeStack.Screen name="LoginPasscodeScreen" component={LoginPasscodeScreen} /> */}
    </HomeStack.Navigator>
  );
}

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddVehicle from "../screens/AddVehicle";
import VehicleAddedScreen from "../screens/VehicleAddedScreen";
import UserLoginScreen from "../screens/UserLoginScreen";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ setIsAuthenticated }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain">
        {(props) => (
          <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen name="AddVehicle" component={AddVehicle} />
      <HomeStack.Screen name="UserLoginScreen" component={UserLoginScreen} />
      <HomeStack.Screen
        name="VehicleAddedScreen"
        component={VehicleAddedScreen}
      />
    </HomeStack.Navigator>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";
import UserLoginScreen from "../screens/UserLoginScreen";
import LoginPasscodeScreen from "../screens/LoginPasscodeScrren";
import EnterPasscodeScreen from "../screens/EnterPasscodeScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = ({ initialRouteName, setIsAuthenticated }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserLoginScreen">
        {(props) => (
          <UserLoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <Stack.Screen name="LoginPasscodeScreen">
        {(props) => (
          <LoginPasscodeScreen
            {...props}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EnterPasscodeScreen"
        component={EnterPasscodeScreen}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
